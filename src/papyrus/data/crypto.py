"""Encryption utilities for sensitive data.

This module provides encryption and decryption for API keys and other
sensitive data stored in the database.
"""

from __future__ import annotations

import base64
import os
import secrets
from pathlib import Path
from typing import Final

try:
    from cryptography.fernet import Fernet
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    CRYPTO_AVAILABLE = True
except ImportError:
    CRYPTO_AVAILABLE = False

from papyrus.paths import DATA_DIR

# Constants
KEY_FILE: Final[str] = str(Path(DATA_DIR) / ".master_key")
SALT_FILE: Final[str] = str(Path(DATA_DIR) / ".salt")
ITERATIONS: Final[int] = 480000


def _generate_master_key() -> bytes:
    """Generate a new master key for encryption."""
    return Fernet.generate_key()


def _get_or_create_master_key() -> bytes | None:
    """Get existing master key or create a new one."""
    if not CRYPTO_AVAILABLE:
        return None
    
    try:
        # Try to read existing key
        if os.path.exists(KEY_FILE):
            with open(KEY_FILE, "rb") as f:
                return f.read()
        
        # Generate new key
        key = _generate_master_key()
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(KEY_FILE), exist_ok=True)
        
        # SECURITY: atomic create with restricted permissions to avoid TOCTOU
        try:
            fd = os.open(KEY_FILE, os.O_CREAT | os.O_WRONLY | os.O_EXCL, 0o400)
            with os.fdopen(fd, "wb") as f:
                f.write(key)
        except FileExistsError:
            # Another process created it; read it instead
            with open(KEY_FILE, "rb") as f:
                return f.read()
        except OSError:
            # Fallback for Windows or other platforms
            with open(KEY_FILE, "wb") as f:
                f.write(key)
            try:
                os.chmod(KEY_FILE, 0o400)
            except Exception:
                pass
        
        return key
    except Exception:
        return None


def _get_or_create_salt() -> bytes:
    """Get existing salt or create a new one."""
    try:
        if os.path.exists(SALT_FILE):
            with open(SALT_FILE, "rb") as f:
                return f.read()
        
        # Generate new salt
        salt = secrets.token_bytes(16)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(SALT_FILE), exist_ok=True)
        
        # SECURITY: atomic create with restricted permissions
        try:
            fd = os.open(SALT_FILE, os.O_CREAT | os.O_WRONLY | os.O_EXCL, 0o600)
            with os.fdopen(fd, "wb") as f:
                f.write(salt)
        except FileExistsError:
            with open(SALT_FILE, "rb") as f:
                return f.read()
        except OSError:
            with open(SALT_FILE, "wb") as f:
                f.write(salt)
            try:
                os.chmod(SALT_FILE, 0o600)
            except Exception:
                pass
        
        return salt
    except Exception:
        # Fallback salt (not secure but functional)
        return b"papyrus_default_salt"


def _derive_key_from_password(password: str, salt: bytes | None = None) -> bytes:
    """Derive an encryption key from a password.
    
    This is used as a fallback when the master key file is not available.
    """
    if not CRYPTO_AVAILABLE:
        raise RuntimeError("cryptography library not available")
    
    if salt is None:
        salt = _get_or_create_salt()
    
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=ITERATIONS,
    )
    key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
    return key


def _get_cipher() -> Fernet | None:
    """Get the cipher instance for encryption/decryption."""
    if not CRYPTO_AVAILABLE:
        return None
    
    master_key = _get_or_create_master_key()
    if master_key is None:
        return None
    
    try:
        return Fernet(master_key)
    except Exception:
        return None


def encrypt_api_key(api_key: str) -> str:
    """Encrypt an API key.
    
    Args:
        api_key: The API key to encrypt
        
    Returns:
        Base64 encoded encrypted string.
        
    Raises:
        RuntimeError: If cryptography library is not available or encryption fails.
    """
    if not api_key:
        return api_key
    
    if not CRYPTO_AVAILABLE:
        # SECURITY: refuse to store plaintext when encryption is unavailable
        raise RuntimeError("cryptography library is required to store API keys securely")
    
    cipher = _get_cipher()
    if cipher is None:
        raise RuntimeError("Failed to initialize encryption cipher")
    
    try:
        encrypted = cipher.encrypt(api_key.encode())
        return f"enc:{base64.urlsafe_b64encode(encrypted).decode()}"
    except Exception as e:
        raise RuntimeError(f"Encryption failed: {e}") from e


def decrypt_api_key(encrypted_key: str) -> str:
    """Decrypt an API key.
    
    Args:
        encrypted_key: The encrypted API key (with prefix)
        
    Returns:
        The decrypted API key, or the original string if decryption fails
    """
    if not encrypted_key:
        return encrypted_key
    
    # Check for plain text prefix
    if encrypted_key.startswith("plain:"):
        return encrypted_key[6:]
    
    # Check for encrypted prefix
    if not encrypted_key.startswith("enc:"):
        # Legacy format: return as-is
        return encrypted_key
    
    if not CRYPTO_AVAILABLE:
        # Can't decrypt without cryptography library
        return ""
    
    cipher = _get_cipher()
    if cipher is None:
        return ""
    
    try:
        encrypted_data = base64.urlsafe_b64decode(encrypted_key[4:])
        decrypted = cipher.decrypt(encrypted_data)
        return decrypted.decode()
    except Exception:
        return ""


def rotate_master_key() -> bool:
    """Rotate the master encryption key.
    
    This re-encrypts all encrypted data with a new key.
    
    Returns:
        True if successful, False otherwise
    """
    # TODO: Implement key rotation with re-encryption of all API keys
    # This requires:
    # 1. Get all encrypted API keys from database
    # 2. Decrypt them with old key
    # 3. Generate new key
    # 4. Encrypt with new key
    # 5. Update database
    return False


# Legacy support: simple obfuscation for systems without cryptography
def _simple_obfuscate(data: str) -> str:
    """Simple obfuscation (not encryption, just prevents casual viewing)."""
    if not data:
        return data
    try:
        encoded = base64.b64encode(data.encode()).decode()
        return f"b64:{encoded}"
    except Exception:
        return data


def _simple_deobfuscate(data: str) -> str:
    """Reverse simple obfuscation."""
    if not data or not data.startswith("b64:"):
        return data
    try:
        return base64.b64decode(data[4:]).decode()
    except Exception:
        return data
