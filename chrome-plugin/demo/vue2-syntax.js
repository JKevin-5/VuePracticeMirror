const Vue2SyntaxValidator = (text) => {
    const errors = [];
    
    // 这里可以添加 Vue 2 的语法检查逻辑
    // 例如：检查 Vue 模板语法、指令、组件等
  
    if (text.indexOf('v-for') === -1) {
      errors.push({
        message: 'Missing v-for directive',
        severity: 'warning',
        from: CodeMirror.Pos(0, 0),
        to: CodeMirror.Pos(0, 0)
      });
    }
  
    return errors;
  };