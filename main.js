
var path_start = '';

function check_and_run_code() {
    var code_input = code.val();
    try {
        eval('('+code_input+')');
    }
    catch(e) {
        message(text.js_error);
        return;
    }
    
    var code_fn = new Function('return '+code_input);
    
    var code_result = code_fn();
    
    if ( check.is_jQuery(code_result) ) {
        message(text.valid_jquery+text.praise, true);
    }
    else {
        var code_result_trimmed = (code_result+'').substring(0,50);
        var trimmed = (code_result_trimmed !== code_result+'') ? text.trimmed : '';
        message(text.code_return + code_result_trimmed + trimmed + text.ok, true);
    }

}

run.click(check_and_run_code);
