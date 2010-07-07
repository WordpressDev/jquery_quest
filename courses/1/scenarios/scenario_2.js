S.hello_from_your_teacher = {
    order: 1,
    title: 'Hello from your teacher',
    author: 'kk',
    difficulty: 0,
    init: function() {
        var example1 = '$(\'<div class="angel" />\') \n\
.appendTo("#arena") \n\
.animate({ \n\
    "left":  "50%", \n\
    "right": "50%" \n\
})';
        teacher.show().delay(2000).say('Feeling good today?').delay(2000).say('Wanna learn jQuery?').delay(2000).say('Try typing in the box').delay(2000).say('I\'ll be right behind you!').delay(2000).hide().delay(10000).show().delay(2000).say('So...').delay(2000).say('Did you do anything exciting?').delay(2000).say('Ok, watch me do it!').delay(2000).write(example1).delay(2000).say('Don\' forget to press Run now to run the code!');
    }
}