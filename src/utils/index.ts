export * from './cn';

/**
 * 拷贝代码
 * @param text
 * @returns
 */
export const copyText = (text: string) => {
  // 兼容性的剪贴板 API
  const ClipboardAPI = () => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.select();

    return new Promise((resolve, reject) => {
      // 执行复制命令并移除文本框
      document.execCommand('copy') ? resolve(null) : reject();
      document.body.removeChild(textArea);
    });
  };

  if (navigator.clipboard && window.isSecureContext) {
    try {
      return navigator.clipboard.writeText(text);
    } catch (error) {
      ClipboardAPI();
    }
  } else {
    ClipboardAPI();
  }
};
