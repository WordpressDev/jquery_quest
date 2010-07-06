var code = $('#code'),
    feedback = $('#feedback'),
    shadow = $('#code_shadow'),
    run = $('#run');
    
    function token_is_last(token, code) {
    return code.lastIndexOf(token)===code.length-token.length;
}

function last_token_pos(token, code) {
    return code.lastIndexOf(token);
}

function last_token(code) {
    return code.replace(/[\.(){}\',\:\|]/g, '|').replace(/\s/g, '').replace(/\|{2,}/g,'|').split('|').pop();
}

function token_being_typed(all_code) {
    var ret = '';
    var lt = last_token(all_code);
    var possible_matches = find_matches(lt, dict.jQuery);
    if ( possible_matches.length && token_is_last(lt, all_code) ) {
        ret = possible_matches[0];
    }
    
    return ret;
}

function sync_code() {
    var all_code = code.val();
    shadow.removeClass('active').val(all_code);
    shadow.scrollTop(code.scrollTop())
    var token_complete = token_being_typed(all_code);
    if ( token_complete ) {
        var token_incomplete = last_token(all_code);
        shadow.addClass('active').val(all_code.substring(0,last_token_pos(token_incomplete, all_code))+token_complete);
    }
}

function schedule(fn, msec) {
    setInterval(fn, msec);
}

schedule(sync_code, 500);

//events
code.keydown(function(e) {
  if ( e.keyCode ===9 ) {
    code.val(shadow.val());
    e.preventDefault();
  }
  if ( e.keyCode === 17 ) {
    run.trigger('focus');
  }
});
code.keyup(sync_code);

function type_letters(input, index) {
    index = index || 0;
    input[index] && code.val(code.val()+input[index])
    index++;
    input[index] && setTimeout(function() {type_letters(input, index)}, ~~(Math.random*200))
}

var editor = {
    type: function(input) {
        type_letters(input)
    },
    erase: function() {
        code.val('');
    }
}