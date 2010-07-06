function message(content, queue) {
    if (!state.is_message_used || queue) {
        state.is_message_used = true;
        feedback.text(content).animate({top:0}, 500).delay(2000).animate({top:'-4em'}, 250, function() {state.is_message_used = false});
    }
}

var code = $('#code'),
    feedback = $('#feedback'),
    shadow = $('#code_shadow'),
    state = {
        is_message_used: false
    },
    text = {
        js_error: 'Oops, JavaScript and jQuery couldn\'t understand this code.',
        code_return: 'Your code returned ',
        valid_jquery: 'Congrats, your code is valid jQuery!',
        praise: ' Genius!',
        ok: ' Not bad!',
        trimmed: '... (we trimmed it a bit).'
    }

var check = {
    
    is_jQuery: function(r) {
        return (r instanceof jQuery);
    },
    
    matched_elements: function(r) {
        return r.length;
    },
    
    found_selector: function(r) {
        return r.selector;
    }
    
}

var dict = {
    jQuery: ["jQuery", "each", "size", "eq", "get", "index", "length", "selector", "context", "data", "removeData", "queue", "dequeue", "fn.extend", "extend", "noConflict", "id", "element", "class", "all", "multiple", "descendant", "child", "next", "siblings", "first", "last", "not", "even", "odd", "eq", "gt", "lt", "header", "animated", "contains", "empty", "has", "parent", "hidden", "visible", "attributeHas", "attributeEquals", "attributeNotEqual", "attributeStartsWith", "attributeEndsWith", "attributeContains", "attributeMultiple", "nthChild", "firstChild", "lastChild", "onlyChild", "input", "text", "password", "radio", "checkbox", "submit", "image", "reset", "button", "file", "hidden", "enabled", "disabled", "checked", "selected", "attr", "removeAttr", "addClass", "hasClass", "removeClass", "toggleClass", "html", "text", "val", "eq", "hasClass", "filter", "is", "map", "not", "slice", "add", "children", "closest", "contents", "find", "next", "nextAll", "offsetParent", "parent", "parents", "prev", "prevAll", "siblings", "andSelf", "end", "html", "text", "append", "appendTo", "prepend", "prependTo", "after", "before", "insertAfter", "insertBefore", "wrap", "wrapAll", "wrapInner", "replaceWith", "replaceAll", "empty", "remove", "clone", "css", "offset", "position", "scrollTop", "scrollLeft", "height", "width", "innerHeight", "innerWidth", "outerHeight", "outerWidth", "ready", "bind", "one", "trigger", "triggerHandler", "unbind", "live", "die", "hover", "toggle", "blur", "change", "click", "dblclick", "error", "focus", "keydown", "keypress", "keyup", "load", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "resize", "scroll", "select", "submit", "unload", "show", "hide", "toggle", "slideDown", "slideUp", "slideToggle", "fadeIn", "fadeOut", "fadeTo", "animate", "stop", "fx.off", "ajax", "load", "get", "getJSON", "getScript", "post", "ajaxComplete", "ajaxError", "ajaxSend", "ajaxStart", "ajaxStop", "ajaxSuccess", "ajaxSetup", "serialize", "serializeArray", "support", "browser", "browser.version", "boxModel", "each", "extend", "grep", "makeArray", "map", "inArray", "merge", "unique", "isArray", "isFunction", "trim", "param", "data", "removeData"]
}

$('#run').click(function() {
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

});

function find_matches(token, dict, letter_index) {

    var matched = [];
    
    if (token && dict && token.length && dict.length) {
        var dl=dict.length-1;
        li = letter_index || 0;

        while(dict[dl]) {
            if (token[li] === dict[dl][li]) {
                matched.push(dict[dl])
            }
            dl--;
        }
        li++;
        if (token[li] && matched.length) {
            return find_matches(token, matched, li)
        }
    }

    return matched;
}

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
    $('#run').trigger('focus');
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