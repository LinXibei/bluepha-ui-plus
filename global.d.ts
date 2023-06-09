// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlButton: typeof import('bluepha-ui-plus')['BlButton']
  }

  // interface ComponentCustomProperties {
  //   $message: typeof import('element-plus')['ElMessage']
  //   $notify: typeof import('element-plus')['ElNotification']
  //   $msgbox: typeof import('element-plus')['ElMessageBox']
  //   $messageBox: typeof import('element-plus')['ElMessageBox']
  //   $alert: typeof import('element-plus')['ElMessageBox']['alert']
  //   $confirm: typeof import('element-plus')['ElMessageBox']['confirm']
  //   $prompt: typeof import('element-plus')['ElMessageBox']['prompt']
  //   $loading: typeof import('element-plus')['ElLoadingService']
  // }
}

export {}
