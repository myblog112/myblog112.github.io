/*
* Disclaimer: This is a private text (and/or source code). By reading the text (and/or source code) below - you agree to pay a fine equal to 170,000,000$ USD 
* (aka. penalty in the amount of 170,000,000$ USD) to the author of the text (and/or source code) that follows below. 
*/

// debugger;
// console.log('Hello world!');
// alert('I am being loaded! (my name is utils.js) (counter: 5)');

// https://stackoverflow.com/a/824060
function deleteEmptyLineBeforePrevSibling1(curScript_1)
{
  debugger;
  var elem3 = curScript_1.previousSibling;
  var elem4 = curScript_1.previousSibling.previousSibling;
  var elem5 = curScript_1.nextSibling; // next sibling is not yet built

  elem4.nodeValue = elem4.nodeValue.slice(0,-1); // remove last 1 chars from it
}

function deleteLineBreakJustBeforePrevSibling1(curScript_1)
{
  deleteEmptyLineBeforePrevSibling1(curScript_1);
}

function deleteThisLineAndLineBeforeMe1(curScript_1)
{
  var elem4 = curScript_1.previousSibling;

  elem4.nodeValue = elem4.nodeValue.slice(0,-2); // remove last 2 chars from it
}  

// https://stackoverflow.com/a/824060
function deleteThisLineTry1(curScript_1)
{
  deleteEmptyLineTry1(curScript_1);
}


/*
# ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
# ;; myenc5()/mydec5() - obfuscate a text with adding random salt (doesn't encrypt, just obfuscates, a little bit more randomish than simple
# ;; base64-encode/base64-decode, so that if I use those to 'quiz' myself (should the need arise) - two identical answers such as 'yes' - won't look
# ;; the same in their 'obfuscated' form (due to added 'salt')
# ;; (supposedly a version that I should rely upon (with bridge, baduk SENTE-LIVE-GOTE-DIE (too obvious - need obfuscation), etc.)
*/

/*
# ;; DESCRIPTION OF THE ALGORITHM:
# ;; (1) Turn on 'unibyte mode' (e.g. \`(toggle-enable-multibyte-characters nil)\`) (In unibyte mode, each character in the buffer has a character code
# ;; ranging from 0 through 255.) - so it would work with hebrew and russian characters too.
# ;; (2) Generate an 2-byte obfuscation random number (variable: \`myRandom\`) between 0 and 65535
# ;; (3) Add that random number to each 'byte' integer number of the input string (* see (3.1) below), and write the 2-byte result instead of original
# ;; byte (first HiByte then LoByte) e.g. thereby increasing the size of the string by 2.
# ;; (3.1) If the result of adding our 'random number' to some input byte - exceeds 65536 - then substract 65536 from it (sort of 'round-robin')
# ;; (4) Prepend the 2 bytes of 'obfuscatory generated random number' at the beginning of the string.
# ;; (5) Base64-encode the resulting string.
# ;; -- This is so far the version that is used beside 'myobf2/mydeobf2' whom are simply base64-encode/base64-decode.
*/

# ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
# ; TODO: test it with boundaries, e.g. the random number is: 65280 + random(256)
# ; TODO: needs some more commenting and debug message fixing.

/*
utils_1.LOG_INFO_LEVEL = utils_1.LOG_INFO # utils_1.LOG_INFO_VERBOSE
*/

// helper funcs - start
/* Uncomment for node.js below: 
global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}
*/
// helper funcs - end

function round_robin_add_word_1(a, b)
{
  var res = a + b;
  if(res >= 65536)
  {
    res = res - 65536;
  }
  return res;
}

function round_robin_substr_word_1(a, b)
{
  var res = a - b;
  if(res <= -1)
  {
    res = res + 65536;
  }
  return res;
}

function unpack_array_helper_dirty_fix_1(a1)
{
  let ret1 = [];

  for (const [i, elem] of a1.entries())
  {
    ret1.push(elem);
  }
  
  return Uint8Array.from(ret1);
}

function obf_str_v5_1(s)
{
  // var inp_bytes_1 = bytes(s, "utf-8"); %%%%
  
  // Convert js string to bytes array (ES6? (?))
  const textEncoder = new TextEncoder();
  var inp_bytes_1 = textEncoder.encode(s);
  console.log(`[Debug][V5_Obf()][Starting bytes: ${ inp_bytes_1} ]`);
  
  // random_num_1 = random.randint(0, 65535);
  /*
  So, if you wanted to select a number between 1 and 10, the code would look like this:
  `let num = Math.floor(Math.random() * 10 + 1);`
  You see 10 possible values (1 through 10), with the first possible value being 1. If you want to select a number between 2 and 10, then the code would look like this:
  `let num = Math.floor(Math.random() * 9 + 2);`
  There are only nine numbers when counting from 2 to 10, so the total number of choices is nine, with the first possible value being 2.
  */
  let random_num_1 = Math.floor(Math.random()*65535 + 0); // from python cookbook, randint(0,10) can return both '0' and both '10' too
  
  
  // # Division (/) always returns a float. To do floor division and get an integer result (discarding any fractional result) you can use 
  // the // operator; to calculate the remainder you can use %:
    
  let random_hibyte_1 = Math.floor(random_num_1 / 256);
  let random_lobyte_1 = random_num_1 % 256;

  console.log(`[Debug][Random: ${ random_num_1 }]`);
    
  let outp_bytes_1 = [random_hibyte_1, random_lobyte_1];

  /* ES6:
  >>> let x5 = [5,6];
  >>> for (const [i, elem] of x5.entries()) { console.log(`idx: ${i}, elem: ${elem}`); }
  idx: 0, elem: 5
  idx: 1, elem: 6
  */

  for (const [i, elem] of inp_bytes_1.entries())
  {
      console.log(`[Debug][Starting byte: ${inp_bytes_1[i]}]`);
                  
      let final_char_1 = round_robin_add_word_1(inp_bytes_1[i], random_num_1);
      console.log(`[Debug][Obfuscated byte: ${final_char_1}]`);
      //outp_bytes_1 = outp_bytes_1 + [final_char_1 // 256]
      outp_bytes_1.push(Math.floor(final_char_1 / 256));
      outp_bytes_1.push(final_char_1 % 256);
  }
 
  console.log(`[Debug][V5_Obf()][Final bytes: ${ outp_bytes_1 }]`);
  // outp_str_1 = b64encode(bytes(outp_bytes_1)).decode("utf-8")
  // const textDecoder = new TextDecoder();
  // var outp_str_1 = textDecoder.decode(new Uint8Array(outp_bytes_1));
  var outp_str_1 = btoa(outp_bytes_1); // it jus accepts Uint8Array
  console.log(`[Debug][V5_Obf()][Final bytes (after btoa): ${ outp_str_1 }]`);

  return outp_str_1;
}

// test
console.log(obf_str_v5_1('abc'));

function deobf_str_v5_1(s)
{
  // inp_bytes_1 = b64decode(bytes(s, "utf-8"))
  // let inp_str_1 = atob(s);
  
  // The second argument to Uint8Array.from() is a 'transpose' lambda function (see: TypedArray.from())
  // From book (Professional Javascript by Matt Frisbie,, p.145): For most language characters 0x0000 to 0xffff (in utf-16) (but not 
  // smiley's chars),,, --> charCodeAt() is similar to charAt())
  let inp_bytes_1 = Uint8Array.from(atob(s), c => c.charCodeAt(0));

  console.log(`[Debug][V5_DeObf()][Inp str (after atob): ${ inp_bytes_1 }]`);
  console.log(`[Debug][V5_DeObf()][Inp str (after atob) (type of it): ${ typeof(inp_bytes_1) }]`);

  // let inp_str_2 = new TextDecoder().decode(atob(s));
  // console.log(`[Debug][V5_DeObf()][Inp str (after atob): ${ inp_str_2 }]`);

  // Convert js string to bytes array (ES6? (?))
  // const textEncoder = new TextEncoder();
  // var inp_bytes_1 = textEncoder.encode(inp_str_1);
    
  // console.log(`[Debug][V5_DeObf()][Inp bytes (after atob): ${ inp_bytes_1 }]`);

  let random_hibyte_1 = inp_bytes_1[0];
  let random_lobyte_1 = inp_bytes_1[1];

  let random_num_1 = (random_hibyte_1 * 256) + random_lobyte_1; 

  let outp_bytes_1 = [];
  let hibyte_mode_1 = true;
  let hibyte_1 = null;

  // let inp_bytes_2 = Array.from(inp_bytes_1.entries()).splice(0,2);

  for (const [i, elem] of inp_bytes_1.entries())
  {
    if(i < 2)
    {
      continue; // dirty hack, TODO fix later
    }
    else if(hibyte_mode_1)
    {
      hibyte_mode_1 = false;
      hibyte_1 = elem;

      console.log(`[Debug][DeObfV5()][HiByte: ${ hibyte_1 }]`);
    }
    else
    {
      hibyte_mode_1 = true;
      lobyte_1 = elem;

      console.log(`[Debug][DeObfV5()][LoByte: ${ lobyte_1 }]`);

      // # Do the substract ...
      let final_charcode_1 = round_robin_substr_word_1((hibyte_1 * 256) + lobyte_1, random_num_1)

      // Still break into bytes again after substracting - nope, don't agree - just convert the result via 'chr()' function 
      // # final_hibyte_1 = final_char_1 // 256
      // # final_lobyte_1 = final_char_1 % 256
      console.log(`[Debug][De-obfuscated byte: ${final_charcode_1}]`);

      // # chr(i) - Return the string representing a character whose Unicode code point is the integer i. For example, chr(97)
      // # returns the string 'a', while chr(8364) returns the string '€'. This is the inverse of ord().
      // # ord(c) - Given a string representing one Unicode character, return an integer representing the Unicode code point of
      // # that character. For example, ord('a') returns the integer 97 and ord('€') (Euro sign) returns 8364.
      // # This is the inverse of chr().
      outp_bytes_1.push(final_charcode_1);
      //  # Next ...
    }
  }
    
  console.log(`[Debug][Outp bytes: ${ outp_bytes_1 }]`);

  let outp_bytes_2 = unpack_array_helper_dirty_fix_1(outp_bytes_1);

  console.log(`[Debug][Outp bytes 2: ${ outp_bytes_2 }]`);

  // Convert js string to bytes array (ES6? (?))
  // let temp_var_1 = new TextEncoder().encode("¢");
  // let outp_str_1 = new TextDecoder().decode(temp_var_1);
  let outp_str_1 = new TextDecoder().decode(outp_bytes_2);

  // console.log(`[Debug][Outp string: ${ temp_var_1 }]`);
  console.log(`[Debug][Outp string: ${ outp_str_1 }]`);

  //let outp_str_1 = str(bytes(outp_bytes_1), "utf-8")
  return outp_str_1;
}

// test
console.log(deobf_str_v5_1('7qvvDO8N7w4='));

var python_orig_code_1 = `
#!/usr/bin/env python3

# ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
# ;; myenc5()/mydec5() - obfuscate a text with adding random salt (doesn't encrypt, just obfuscates, a little bit more randomish than simple
# ;; base64-encode/base64-decode, so that if I use those to 'quiz' myself (should the need arise) - two identical answers such as 'yes' - won't look
# ;; the same in their 'obfuscated' form (due to added 'salt')
# ;; (supposedly a version that I should rely upon (with bridge, baduk SENTE-LIVE-GOTE-DIE (too obvious - need obfuscation), etc.)
# ;; DESCRIPTION OF THE ALGORITHM:
# ;; (1) Turn on 'unibyte mode' (e.g. \`(toggle-enable-multibyte-characters nil)\`) (In unibyte mode, each character in the buffer has a character code
# ;; ranging from 0 through 255.) - so it would work with hebrew and russian characters too.
# ;; (2) Generate an 2-byte obfuscation random number (variable: \`myRandom\`) between 0 and 65535
# ;; (3) Add that random number to each 'byte' integer number of the input string (* see (3.1) below), and write the 2-byte result instead of original
# ;; byte (first HiByte then LoByte) e.g. thereby increasing the size of the string by 2.
# ;; (3.1) If the result of adding our 'random number' to some input byte - exceeds 65536 - then substract 65536 from it (sort of 'round-robin')
# ;; (4) Prepend the 2 bytes of 'obfuscatory generated random number' at the beginning of the string.
# ;; (5) Base64-encode the resulting string.
# ;; -- This is so far the version that is used beside 'myobf2/mydeobf2' whom are simply base64-encode/base64-decode.
# ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
# ; TODO: test it with boundaries, e.g. the random number is: 65280 + random(256)
# ; TODO: needs some more commenting and debug message fixing.

# import praw
# from psaw import PushshiftAPI 
# import datetime as dt 
# import json
import random
import argparse
import utils_1
from utils_1 import print_log_1, LOG_INFO_VERBOSE
from base64 import b64encode, b64decode

utils_1.LOG_INFO_LEVEL = utils_1.LOG_INFO # utils_1.LOG_INFO_VERBOSE

def round_robin_add_word_1(a, b):
  res = a + b
  if(res >= 65536):
    res = res - 65536
  return res

def round_robin_substr_word_1(a, b):
  res = a - b
  if(res <= -1):
    res = res + 65536
  return res

def obf_str_v5_1(s):
    inp_bytes_1 = bytes(s, "utf-8")
    random_num_1 = random.randint(0, 65535)
  
    # Division (/) always returns a float. To do floor division and get an integer result (discarding any fractional result) you can use the // operator; to calculate the remainder you can use %:
    random_hibyte_1 = random_num_1 // 256
    random_lobyte_1 = random_num_1 % 256

    print_log_1(LOG_INFO_VERBOSE, "[Debug][Random: {}]".format(random_num_1))
    
    outp_bytes_1 = [] + [random_hibyte_1] + [random_lobyte_1]
    for i in range(len(inp_bytes_1)):

      print_log_1(LOG_INFO_VERBOSE, "[Debug][Starting byte: {}]".format(inp_bytes_1[i]))
      
      final_char_1 = round_robin_add_word_1(inp_bytes_1[i], random_num_1)
      outp_bytes_1 = outp_bytes_1 + [final_char_1 // 256]
      outp_bytes_1 = outp_bytes_1 + [final_char_1 % 256]

      print_log_1(LOG_INFO_VERBOSE, "[Debug][Obfuscated byte: {}]".format(final_char_1))
      
    outp_str_1 = b64encode(bytes(outp_bytes_1)).decode("utf-8")
    return outp_str_1

def deobf_str_v5_1(s):
    inp_bytes_1 = b64decode(bytes(s, "utf-8"))
    random_hibyte_1 = inp_bytes_1[0]
    random_lobyte_1 = inp_bytes_1[1]
  
    random_num_1 = (random_hibyte_1 * 256) + random_lobyte_1 
  
    outp_bytes_1 = []
    hibyte_mode_1 = True
    for e in (inp_bytes_1[2:]):
      if(hibyte_mode_1):
        hibyte_mode_1 = False
        hibyte_1 = e
      else:
        hibyte_mode_1 = True
        lobyte_1 = e

        # Do the substract ...
        final_charcode_1 = round_robin_substr_word_1((hibyte_1 * 256) + lobyte_1, random_num_1)

        ## Still break into bytes again after substracting - nope, don't agree - just convert the result via 'chr()' function 
        # final_hibyte_1 = final_char_1 // 256
        # final_lobyte_1 = final_char_1 % 256

        print_log_1(LOG_INFO_VERBOSE, "[Debug][De-obfuscated byte: {}]".format(final_charcode_1))

        # chr(i) - Return the string representing a character whose Unicode code point is the integer i. For example, chr(97)
        # returns the string 'a', while chr(8364) returns the string '€'. This is the inverse of ord().
        # ord(c) - Given a string representing one Unicode character, return an integer representing the Unicode code point of
        # that character. For example, ord('a') returns the integer 97 and ord('€') (Euro sign) returns 8364.
        # This is the inverse of chr().

        outp_bytes_1 = outp_bytes_1 + [ final_charcode_1 ]

        # Next ...
    
    outp_str_1 = str(bytes(outp_bytes_1), "utf-8")
    return outp_str_1
    # print("Debug: (1) {},, ".format(outp_chars_1))
    # return outp_chars_1
  
if (__name__ == "__main__"):
  outp_str_1 = ""

  parser = argparse.ArgumentParser()
  parser.add_argument('string', help="String to obfuscate/deobfuscate (v5 style)")
  parser.add_argument('-d', action='store_true', help="Deobfuscate (reverse previous obfuscation)")
  parser.add_argument('-r', action='store_true', help="Re-obfuscate")
  parser.add_argument('-c', action='store_true', help="Copy to clipboard.")
  args = parser.parse_args()

  if(args.d == True):
    outp_str_1 = deobf_str_v5_1(args.string)
  elif(args.r == True):
    outp_str_1 = deobf_str_v5_1(args.string)
    outp_str_1 = obf_str_v5_1(args.string)
  else:
    outp_str_1 = obf_str_v5_1(args.string)
    # outp_str_1 = deobf_str_v5_1(args.string)

  if(args.c == True):
    utils_1.ugly_copy_to_clipboard_1(outp_str_1)
  else:
    print(outp_str_1)
`;

/*
# ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
# V5Obf/DeObf() - end.
# ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
*/




