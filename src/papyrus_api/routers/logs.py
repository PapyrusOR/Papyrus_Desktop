"""日志管理API路由。"""

from __future__ import annotations

import os
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from papyrus_api.deps import get_ai_config, get_logger

router = APIRouter(tags=["logs"])


class LogConfigModel(BaseModel):
    log_dir: str = Field(default="", description="日志文件夹路径")
    log_level: str = Field(default="DEBUG", description="日志级别 (DEBUG/INFO/WARNING/ERROR)")
    max_log_files: int = Field(default=10, description="保留日志文件数量")
    log_rotation: bool = Field(default=False, description="是否启用日志轮转")


class LogConfigResponse(BaseModel):
    success: bool
    config: LogConfigModel


class SetLogConfigResponse(BaseModel):
    success: bool
    message: str


class OpenLogDirResponse(BaseModel):
    success: bool
    path: str
    message: str


@router.get("/config/logs", response_model=LogConfigResponse)
def get_log_config_endpoint() -> LogConfigResponse:
    """获取日志配置。"""
    config = get_ai_config()
    log_config = config.get_log_config()
    
    return LogConfigResponse(
        success=True,
        config=LogConfigModel(
            log_dir=log_config.get("log_dir", ""),
            log_level=log_config.get("log_level", "DEBUG"),
            max_log_files=log_config.get("max_log_files", 10),
            log_rotation=log_config.get("log_rotation", False),
        ),
    )


@router.post("/config/logs", response_model=SetLogConfigResponse)
def set_log_config_endpoint(payload: LogConfigModel) -> SetLogConfigResponse:
    """设置日志配置。
    
    修改配置后会自动应用到日志记录器。
    """
    try:
        config = get_ai_config()
        logger = get_logger()
        
        # 验证日志级别
        valid_levels = ["DEBUG", "INFO", "WARNING", "ERROR"]
        if payload.log_level.upper() not in valid_levels:
            raise HTTPException(
                status_code=400, 
                detail=f"无效的日志级别: {payload.log_level}，必须是 {valid_levels} 之一"
            )
        
        # 验证日志目录
        if payload.log_dir:
            try:
                os.makedirs(payload.log_dir, exist_ok=True)
            except OSError as e:
                raise HTTPException(
                    status_code=400,
                    detail=f"无法创建日志目录: {e}"
                )
        
        # 更新配置
        from ai.config import LogConfig
        new_config: LogConfig = {
            "log_dir": payload.log_dir or config.get_log_config().get("log_dir", ""),
            "log_level": payload.log_level.upper(),
            "max_log_files": max(1, payload.max_log_files),
            "log_rotation": payload.log_rotation,
        }
        
        # 保存到配置文件
        config.set_log_config(new_config)
        
        # 应用到日志记录器
        if logger is not None:
            if payload.log_dir:
                logger.set_log_dir(new_config["log_dir"])
            logger.set_log_level(new_config["log_level"])
            logger.set_max_log_files(new_config["max_log_files"])
            logger.set_log_rotation(new_config["log_rotation"])
        
        return SetLogConfigResponse(
            success=True,
            message="日志配置已更新",
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"保存日志配置失败: {e}")


@router.post("/logs/open-dir", response_model=OpenLogDirResponse)
def open_log_dir_endpoint() -> OpenLogDirResponse:
    """打开日志文件夹。
    
    尝试使用系统默认方式打开日志文件夹，并返回日志文件夹路径。
    """
    try:
        logger = get_logger()
        
        if logger is None:
            # 如果日志记录器未初始化，使用配置中的路径
            config = get_ai_config()
            log_dir = config.get_log_config().get("log_dir", "")
            if not log_dir:
                log_dir = os.path.join(os.path.dirname(config.config_file), "logs")
            os.makedirs(log_dir, exist_ok=True)
            return OpenLogDirResponse(
                success=True,
                path=log_dir,
                message=f"日志文件夹路径: {log_dir}（日志记录器未初始化）",
            )
        
        # 使用日志记录器的 open_log_dir 方法
        log_dir = logger.open_log_dir()
        
        return OpenLogDirResponse(
            success=True,
            path=log_dir,
            message=f"已打开日志文件夹: {log_dir}",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"打开日志文件夹失败: {e}")


@router.get("/logs/dir", response_model=dict[str, Any])
def get_log_dir_endpoint() -> dict[str, Any]:
    """获取日志文件夹路径。"""
    try:
        config = get_ai_config()
        log_config = config.get_log_config()
        log_dir = log_config.get("log_dir", "")
        
        if not log_dir:
            log_dir = os.path.join(os.path.dirname(config.config_file), "logs")
        
        # 确保目录存在
        os.makedirs(log_dir, exist_ok=True)
        
        # 获取日志文件列表
        log_files = []
        if os.path.exists(log_dir):
            for filename in os.listdir(log_dir):
                if filename.endswith(".log"):
                    filepath = os.path.join(log_dir, filename)
                    try:
                        stat = os.stat(filepath)
                        log_files.append({
                            "name": filename,
                            "size": stat.st_size,
                            "modified": stat.st_mtime,
                        })
                    except OSError:
                        pass
        
        return {
            "success": True,
            "path": log_dir,
            "files": sorted(log_files, key=lambda x: x["modified"], reverse=True),  # type: ignore[misc,arg-type]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取日志目录失败: {e}")
