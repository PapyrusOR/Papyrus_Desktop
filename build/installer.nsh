; NSIS Installer Script for Papyrus
; Includes automatic root CA certificate installation (optional)

!macro customInit
  ; Admin rights check is handled by electron-builder
  ; This macro runs at installer initialization
!macroend

!macro customInstall
  ; Try to install root CA certificate if it exists
  ; Use /nonfatal flag so it doesn't fail if file doesn't exist
  DetailPrint "Checking for root certificate..."
  
  ; Extract certificate to temp directory (non-fatal)
  File "/nonfatal" "/oname=$TEMP\PapyrusRootCA.cer" "${BUILD_RESOURCES_DIR}\root-ca.cer"
  
  ; Check if file was extracted successfully
  IfFileExists "$TEMP\PapyrusRootCA.cer" cert_found cert_not_found
  
  cert_found:
    DetailPrint "Installing Papyrus Root CA certificate..."
    
    ; Install certificate using certutil (requires admin)
    nsExec::ExecToLog 'certutil -addstore -f Root "$TEMP\PapyrusRootCA.cer"'
    Pop $0
    
    ${If} $0 == "0"
      DetailPrint "Root CA certificate installed successfully."
    ${Else}
      DetailPrint "Warning: Failed to install root CA certificate (code: $0)."
    ${EndIf}
    
    ; Clean up temp file
    Delete "$TEMP\PapyrusRootCA.cer"
    Goto cert_done
    
  cert_not_found:
    DetailPrint "Note: Root certificate not included in this build."
    
  cert_done:
!macroend

!macro customUninstall
  ; Try to remove root CA certificate on uninstall
  UserInfo::GetAccountType
  Pop $0
  
  ${If} $0 == "admin"
    DetailPrint "Checking for Papyrus Root CA certificate..."
    
    ; Try to remove certificate (don't fail if not present)
    nsExec::ExecToLog 'certutil -delstore Root "9EE5C13E206DC5DDAC254213E9A45798FE92C303"'
    Pop $0
    
    ${If} $0 == "0"
      DetailPrint "Root CA certificate removed successfully."
    ${Else}
      DetailPrint "Note: Root CA certificate not found or already removed."
    ${EndIf}
  ${Else}
    DetailPrint "Note: Admin rights required to remove root certificate."
  ${EndIf}
!macroend
