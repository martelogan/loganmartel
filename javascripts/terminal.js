// Generated by CoffeeScript 1.12.7
(function() {
  var Terminal, terminal;

  Terminal = (function() {
    var command_line;

    function Terminal(target, PS1, welcome, guide, commands, broadcasts, secrets) {
      var command, history, i, index, instance, len, ref;
      this.target = target != null ? target : ".shell .text";
      this.PS1 = PS1 != null ? PS1 : "$ ";
      this.welcome = welcome != null ? welcome : "./hello_friend";
      this.guide = guide != null ? guide : "Run 'help' for basic commands";
      this.commands = commands != null ? commands : ["about", "projects", "skills", "resume", "interests", "glass_sort", "clear", "ls", "help"];
      this.broadcasts = broadcasts != null ? broadcasts : ["about", "projects", "skills", "resume"];
      this.secrets = secrets != null ? secrets : ["gandalf"];
      instance = this;
      history = [];
      index = history.length;
      ref = this.broadcasts;
      for (i = 0, len = ref.length; i < len; i++) {
        command = ref[i];
        instance[command] = function() {
          return instance["broadcast"](command);
        };
      }
      $(document).keydown(function(e) {
        if (e.which === 76 && e.ctrlKey) {
          e.preventDefault();
          instance.clear();
          return instance.newline();
        }
      });
      $(document).keydown(function(e) {
        var code, input;
        code = e.which;
        if (code === 38 || code === 40) {
          e.preventDefault();
          input = $('input#command').last();
          if (code === 38 && index - 1 >= 0) {
            index--;
          }
          if (code === 40 && index + 1 <= history.length) {
            index++;
          }
          if ((0 <= index && index < history.length)) {
            return input.val(history[index]);
          } else {
            return input.val('');
          }
        }
      });
      $(document).keydown(function(e) {
        var input, j, k, len1, len2, option, options, results, results1, str;
        if (e.which === 9) {
          e.preventDefault();
          input = $('input#command').last();
          str = input.val();
          options = instance.commands.concat(instance.secrets);
          results = [];
          for (j = 0, len1 = options.length; j < len1; j++) {
            command = options[j];
            if (command.substr(0, str.length) === str) {
              results.push(command);
            }
          }
          if (results.length === 0) {

          } else if (results.length === 1) {
            return input.val(results[0]);
          }
          instance.print("<br>");
          results1 = [];
          for (k = 0, len2 = results.length; k < len2; k++) {
            option = results[k];
            instance.print(option + "<br>");
            results1.push(instance.newline);
          }
          return results1;
        }
      });
      $(document.body).on('keyup', 'input#command', function(e) {
        if (e.which === 13) {
          $(this).blur();
          $(this).prop('readonly', true);
          command = $(this).val();
          command = command.toLowerCase();
          instance.print("<br>");
          try {
            if (command === "init" || command === "newline") {
              throw "no h4x0rs allowed!";
            }
            if (command.substr(0, 2) === "cd") {
              console.log(instance["cd"]());
            } else {
              instance["" + command]();
            }
            history.push(command);
            return index = history.length;
          } catch (error) {
            e = error;
            console.log(e);
            return instance.print("command unavailable");
          } finally {
            setTimeout((function() {
              return instance.newline();
            }), 200);
          }
        }
      });
    }

    command_line = '<input type="text" id="command" value="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">';

    Terminal.prototype.init = function() {
      return this.greet(this.welcome, 0, 100);
    };

    Terminal.prototype.print = function(element) {
      var $target;
      $target = $(this.target);
      return $target.append(element);
    };

    Terminal.prototype.newline = function() {
      this.print("<br> " + this.PS1);
      this.print(command_line);
      return $("input#command").last().focus();
    };

    Terminal.prototype.greet = function(message, index, interval) {
      if (index < message.length) {
        this.print(message[index++]);
        return setTimeout(((function(_this) {
          return function() {
            return _this.greet(message, index, interval);
          };
        })(this)), interval);
      } else {
        this.broadcast("go");
        return $(document).on("done", (function(_this) {
          return function() {
            _this.print("<br> " + _this.guide);
            return _this.newline();
          };
        })(this));
      }
    };

    Terminal.prototype.help = function() {
      var command, i, len, ref, results1;
      ref = this.commands;
      results1 = [];
      for (i = 0, len = ref.length; i < len; i++) {
        command = ref[i];
        if (command !== "help") {
          results1.push(this.print(command + "<br>"));
        }
      }
      return results1;
    };

    Terminal.prototype.broadcast = function(event) {
      return $(document).trigger(event);
    };

    Terminal.prototype.clear = function() {
      return $(this.target).empty();
    };

    Terminal.prototype.interests = function() {
      this.print("Hey, I'm looking for projects in:<br>");
      this.print("machine learning (esp. NLP)<br>");
      this.print("back-end (mobile or web)<br>");
      this.print("biotech (esp. bioinformatics)<br>");
      return this.print("Shoot me an email if you want to work together!");
    };

    Terminal.prototype.glass_sort = function() {
      return window.open("http://loganmartel.me/GlassSort/");
    };

    Terminal.prototype.ls = function() {
      var command, i, len, ref, results1;
      this.print("Hey, secret commands will be updated here as they are added:<br>");
      ref = this.secrets;
      results1 = [];
      for (i = 0, len = ref.length; i < len; i++) {
        command = ref[i];
        results1.push(this.print("1. " + command + "<br>"));
      }
      return results1;
    };

    Terminal.prototype.cd = function() {
      return this.print("I'm sorry, Dave. I'm afraid I can't let you do that.");
    };

    Terminal.prototype.gandalf = function() {
      return window.open("https://youtu.be/Sagg08DrO5U");
    };

    return Terminal;

  })();

  terminal = new Terminal();

  terminal.init();

}).call(this);
