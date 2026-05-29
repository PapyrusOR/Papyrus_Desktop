import { inflateRawSync } from 'node:zlib';
import { z } from 'zod';

export interface ExtensionManifest {
  id: string;
  name: string;
  version: string;
  type: string;
  description?: string;
  author?: string;
  tags?: string[];
  config?: Record<string, unknown>;
}

const ManifestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().min(1),
  type: z.string().min(1),
  description: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  config: z.record(z.unknown()).optional(),
});

function readUInt16(buffer: Buffer, offset: number): number {
  return buffer.readUInt16LE(offset);
}

function readUInt32(buffer: Buffer, offset: number): number {
  return buffer.readUInt32LE(offset);
}

function findEndOfCentralDirectory(buffer: Buffer): number {
  for (let offset = buffer.length - 22; offset >= 0; offset -= 1) {
    if (readUInt32(buffer, offset) === 0x06054b50) {
      return offset;
    }
  }
  return -1;
}

function readZipEntry(buffer: Buffer, localHeaderOffset: number, compressedSize: number, compressionMethod: number): Buffer {
  if (readUInt32(buffer, localHeaderOffset) !== 0x04034b50) {
    throw new Error('manifest 本地文件头无效');
  }
  const filenameLength = readUInt16(buffer, localHeaderOffset + 26);
  const extraLength = readUInt16(buffer, localHeaderOffset + 28);
  const dataStart = localHeaderOffset + 30 + filenameLength + extraLength;
  const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
  if (compressionMethod === 0) return compressed;
  if (compressionMethod === 8) return inflateRawSync(compressed);
  throw new Error(`不支持的 zip 压缩方式: ${compressionMethod}`);
}

export function parseExtensionManifestFromZip(zipBuffer: Buffer): ExtensionManifest {
  console.log('[extensions] parsing local extension zip manifest');
  const eocdOffset = findEndOfCentralDirectory(zipBuffer);
  if (eocdOffset < 0) {
    throw new Error('无法打开扩展 zip');
  }

  const totalEntries = readUInt16(zipBuffer, eocdOffset + 10);
  const centralDirectoryOffset = readUInt32(zipBuffer, eocdOffset + 16);
  let offset = centralDirectoryOffset;

  for (let i = 0; i < totalEntries; i += 1) {
    if (readUInt32(zipBuffer, offset) !== 0x02014b50) {
      throw new Error('zip 中央目录无效');
    }
    const compressionMethod = readUInt16(zipBuffer, offset + 10);
    const compressedSize = readUInt32(zipBuffer, offset + 20);
    const filenameLength = readUInt16(zipBuffer, offset + 28);
    const extraLength = readUInt16(zipBuffer, offset + 30);
    const commentLength = readUInt16(zipBuffer, offset + 32);
    const localHeaderOffset = readUInt32(zipBuffer, offset + 42);
    const filename = zipBuffer.subarray(offset + 46, offset + 46 + filenameLength).toString('utf8').replace(/\\/g, '/');

    if (filename === 'manifest.json' || filename.endsWith('/manifest.json')) {
      const raw = readZipEntry(zipBuffer, localHeaderOffset, compressedSize, compressionMethod).toString('utf8');
      const parsedJson: unknown = JSON.parse(raw);
      const parsedManifest = ManifestSchema.safeParse(parsedJson);
      if (!parsedManifest.success) {
        throw new Error(parsedManifest.error.errors.map(e => e.message).join('; '));
      }
      return parsedManifest.data;
    }

    offset += 46 + filenameLength + extraLength + commentLength;
  }

  throw new Error('扩展包缺少 manifest.json');
}
