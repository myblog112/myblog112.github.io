#!/usr/bin/env python3

# ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
# ;; myenc5()/mydec5() - obfuscate a text with adding random salt (doesn't encrypt, just obfuscates, a little bit more randomish than simple
# ;; base64-encode/base64-decode, so that if I use those to 'quiz' myself (should the need arise) - two identical answers such as 'yes' - won't look
# ;; the same in their 'obfuscated' form (due to added 'salt')
# ;; (supposedly a version that I should rely upon (with bridge, baduk SENTE-LIVE-GOTE-DIE (too obvious - need obfuscation), etc.)
# ;; DESCRIPTION OF THE ALGORITHM:
# ;; (1) Turn on 'unibyte mode' (e.g. `(toggle-enable-multibyte-characters nil)`) (In unibyte mode, each character in the buffer has a character code
# ;; ranging from 0 through 255.) - so it would work with hebrew and russian characters too.
# ;; (2) Generate an 2-byte obfuscation random number (variable: `myRandom`) between 0 and 65535
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
