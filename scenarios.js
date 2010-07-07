var arena = $('#arena');

//UI components
var UIC = {
    
    angel: function(context) {
        var self = this,
            node = $('<div class="angel" />').appendTo(arena);
            
        self.fly = function() {
            node.animate({'right': '120%', 'top':~~(10*Math.random())+'em'}, {duration: ~~(50000*Math.random()), complete: function() {node.attr('style','')}});
        }
        
    }
    ,
    arrow: function(context) {
        var self = this,
            node = $('<div class="arrow" />').appendTo(arena);
        
    }
    ,
    teacher: function(context) {
        var self = this,
            node = $('<div id="teacher"><div id="teacher_speak" class="triangle-obtuse left hidden"></div></div>').appendTo(arena),
            speak_node = node.find('#teacher_speak');
            
        self.show = function() {
            node.animate({'bottom': '1em'}, function (){speak_node.removeClass('hidden')});
        }
        
        self.hide = function() {
            speak_node.removeClass('hidden');
            node.animate({'bottom': '-200px'});
        }
        
        self.say = function(text) {
            speak_node.text(text);
        }
        
    }
    
}

//components
var C = {
    angel: function() {

        var self=this,
            type='angel',
            UI;
            
        if (type in UIC) {
            UI = new UIC[type](self)
        }
        
        self.fly = function() {
        
            UI.fly();
            
        }
    },
    
    arrow: function() {

        var self=this,
            type='arrow',
            UI;
            
        if (type in UIC) {
            UI = new UIC[type](self)
        }
        
        self.fly = function() {
        
            UI.fly();
            
        }
    },
    
    teacher: function() {

        var self=this,
            type='teacher',
            queue=0,
            delay=1,
            UI;
            
        if (type in UIC) {
            UI = new UIC[type](self)
        }
        
        function show() {
            UI.show();
            var greeting = 'Hello' + (UI.say.seen_before ? ' again!' : '!');
                UI.say.seen_before = true;
            UI.say(greeting)
        }
        
        function hide() {
            UI.say('Got to go now!');
            setTimeout(UI.hide, 1000);
        }
        
        function say(text) {
            UI.say(text);
        }
        
        function write(code) {
            editor.erase();
            editor.type(code)
        }
            
        function queue_function(fn, arg1, arg2) {
            
            queue++;
            setTimeout(function() {fn.call(this, arg1, arg2);queue--;queue===0 && (delay=0)}, delay);
            return self;
            
        }
        
        self.show = function() {return queue_function(show)}
        self.hide = function() {return queue_function(hide)}
        self.say = function(text) {return queue_function(say, text)}
        self.write = function(code) {return queue_function(write, code)}
        
        self.delay = function(time) {
            
            delay += time;
            return self;
            
        }
        
    },
    
};

//scenarios
var S = [];

var teacher = new C.teacher();

var scenario = location.hash.substr(1).split('/');
$.getScript(path_start+'courses/'+scenario[0]+'/scenarios/scenario_'+scenario[1]+'.js')