var text = {
        js_error: 'Oops, JavaScript and jQuery couldn\'t understand this code.',
        code_return: 'Your code returned ',
        valid_jquery: 'Congrats, your code is valid jQuery!',
        praise: ' Genius!',
        ok: ' Not bad!',
        trimmed: '... (we trimmed it a bit).'
    };
    
function find_matches(token, dict) {

    var matched = [],
        letter_index = arguments[2];
    
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
};

var dict = {
    jQuery: ["jQuery", "each", "size", "eq", "get", "index", "length", "selector", "context", "data", "removeData", "queue", "dequeue", "fn.extend", "extend", "noConflict", "id", "element", "class", "all", "multiple", "descendant", "child", "next", "siblings", "first", "last", "not", "even", "odd", "eq", "gt", "lt", "header", "animated", "contains", "empty", "has", "parent", "hidden", "visible", "attributeHas", "attributeEquals", "attributeNotEqual", "attributeStartsWith", "attributeEndsWith", "attributeContains", "attributeMultiple", "nthChild", "firstChild", "lastChild", "onlyChild", "input", "text", "password", "radio", "checkbox", "submit", "image", "reset", "button", "file", "hidden", "enabled", "disabled", "checked", "selected", "attr", "removeAttr", "addClass", "hasClass", "removeClass", "toggleClass", "html", "text", "val", "eq", "hasClass", "filter", "is", "map", "not", "slice", "add", "children", "closest", "contents", "find", "next", "nextAll", "offsetParent", "parent", "parents", "prev", "prevAll", "siblings", "andSelf", "end", "html", "text", "append", "appendTo", "prepend", "prependTo", "after", "before", "insertAfter", "insertBefore", "wrap", "wrapAll", "wrapInner", "replaceWith", "replaceAll", "empty", "remove", "clone", "css", "offset", "position", "scrollTop", "scrollLeft", "height", "width", "innerHeight", "innerWidth", "outerHeight", "outerWidth", "ready", "bind", "one", "trigger", "triggerHandler", "unbind", "live", "die", "hover", "toggle", "blur", "change", "click", "dblclick", "error", "focus", "keydown", "keypress", "keyup", "load", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "resize", "scroll", "select", "submit", "unload", "show", "hide", "toggle", "slideDown", "slideUp", "slideToggle", "fadeIn", "fadeOut", "fadeTo", "animate", "stop", "fx.off", "ajax", "load", "get", "getJSON", "getScript", "post", "ajaxComplete", "ajaxError", "ajaxSend", "ajaxStart", "ajaxStop", "ajaxSuccess", "ajaxSetup", "serialize", "serializeArray", "support", "browser", "browser.version", "boxModel", "each", "extend", "grep", "makeArray", "map", "inArray", "merge", "unique", "isArray", "isFunction", "trim", "param", "data", "removeData"]
}