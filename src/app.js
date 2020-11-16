/***********************************************************************************
 * Execuation   : on Live Server
 * Purpose      : JavaScript program for frontend
 * @file        : app.js
 * @overview    : Check whether server is running or not
 * @module      : 1.node-fetch   2. browserify
 * @author      : Saurabh Dagwar
 * @since       : 16/11/2020
 *************************************************************************************/

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        const fetch = require("node-fetch");
        const localhost = `http://localhost:4000/greeting`;

        /**
         * @description popup windows for create, update and delete buttons
         * @function createGreetingForm to show createGreeting block
         * @function editGreetingForm to show editGreeting block
         * @function deleteGreetingForm to show deleteGreeting block
         * @function closeForm to close all blocks
         */
        createGreetingForm = () => {
          document.getElementById("createGreeting").style.display = "block";
          document.getElementById("editGreeting").style.display = "none";
          document.getElementById("deleteGreeting").style.display = "none";
        };
        editGreetingForm = () => {
          document.getElementById("editGreeting").style.display = "block";
          document.getElementById("createGreeting").style.display = "none";
          document.getElementById("deleteGreeting").style.display = "none";
        };
        deleteGreetingForm = () => {
          document.getElementById("deleteGreeting").style.display = "block";
          document.getElementById("editGreeting").style.display = "none";
          document.getElementById("createGreeting").style.display = "none";
        };
        closeForm = () => {
          document.getElementById("createGreeting").style.display = "none";
          document.getElementById("editGreeting").style.display = "none";
          document.getElementById("deleteGreeting").style.display = "none";
        };
        /**
         * @description to print cards using innerHTML
         * @param output is and array to store all greetings data
         */
        const printCards = (posts) => {
          let output = "";
          posts.forEach((post) => {
            output += `<div class="card" >
      <textarea  name="G1">Id:- ${post._id}
Name:- ${post.name}
Message:- ${post.message}
Created on:- ${post.createdAt}</textarea>
    </div>`;
          });
          postsCards.innerHTML = output;
        };

        /**
         * @description function is used to get all greeting in json format and call printCards
         * @returns err if any error occured
         */
        getGreeting = () => {
          fetch(localhost)
            .then((response) => response.json())
            .then((result) => result.data)
            .then((data) => printCards(data))
            .catch((err) => {
              return err;
            });
        };
        /**
         * @description create greeting using fetch post method
         * @function postGreeting if data is proper then print data else print err
         */
        postGreeting = () => {
          let greeting = {
            name: document.getElementById("createGreetingName").value,
            message: document.getElementById("createGreetingMessage").value,
          };
          fetch(localhost, {
            method: "POST",
            body: JSON.stringify(greeting),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        /**
         * @description update greeting using fetch put method according with localhost and id
         * @function putGreeting show response successful if data is proper
         */
        putGreeting = () => {
          let greeting = {
            name: document.getElementById("editGreetingName").value,
            message: document.getElementById("editGreetingMessage").value,
          };
          let url = `${localhost}/${
            document.getElementById("editGreetingID").value
          }`;
          fetch(url, {
            method: "put",
            body: JSON.stringify(greeting),
            headers: { "Content-Type": "application/json" },
          })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        /**
         * @description delete greeting using fetch delete method according with Greeting id
         * @function deleteGreeting show response successful if id is present and proper
         */
        deleteGreeting = () => {
          let url = `${localhost}/${
            document.getElementById("deleteGreetingID").value
          }`;
          fetch(url, { method: "delete" })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        };
      },
      { "node-fetch": 2 },
    ],
    2: [
      function (require, module, exports) {
        (function (global) {
          (function () {
            "use strict";

            // ref: https://github.com/tc39/proposal-global
            var getGlobal = function () {
              // the only reliable means to get the global object is
              // `Function('return this')()`
              // However, this causes CSP violations in Chrome apps.
              if (typeof self !== "undefined") {
                return self;
              }
              if (typeof window !== "undefined") {
                return window;
              }
              if (typeof global !== "undefined") {
                return global;
              }
              throw new Error("unable to locate global object");
            };

            var global = getGlobal();

            module.exports = exports = global.fetch;

            // Needed for TypeScript and Webpack.
            if (global.fetch) {
              exports.default = global.fetch.bind(global);
            }

            exports.Headers = global.Headers;
            exports.Request = global.Request;
            exports.Response = global.Response;
          }.call(this));
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {},
    ],
  },
  {},
  [1]
);
