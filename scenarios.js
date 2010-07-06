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
var S = {
    shoot_n_angel: function() {
        for (var i=0;i<5;i++) {
            //later
            //new C.angel().fly();
        }
        //later
        //new C.arrow();
    }
};

$(S.shoot_n_angel())

teacher = new C.teacher().show().delay(2000).say('Feeling good today?').delay(2000).say('Wanna learn jQuery?').delay(2000).say('Try typing in the box').delay(2000).say('I\'ll be right behind you!').delay(2000).hide().delay(10000);
teacher.show().delay(2000).say('So...').delay(2000).say('Did you do anything exciting?').delay(2000).say('Ok, watch me do it!').delay(2000)

var example1 = '$(\'<div class="angel" />\') \n\
.appendTo("#arena") \n\
.animate({ \n\
    "left":  "50%", \n\
    "right": "50%" \n\
})'

teacher.write(example1).delay(2000).say('Don\' forget to press Run now to run the code!');

