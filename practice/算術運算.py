#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb  2 13:38:21 2025

@author: murmursoul
"""

#變數成立
A = int(input("請輸入第一個整數："))
B = int(input("請輸入第二個整數："))
operator = input("請輸入要運算的方式 (+, -, *, /, //, %, **)：")


#運算判斷式，用 if 完成
if operator == "+":
    ans = A + B
elif operator == "-":
    ans = A - B
elif operator == "*":
    ans = A * B
elif operator == "/":
    if B != 0:
        ans = A / B
    else:
        ans = "錯誤 (除數不能為 0)"
elif operator == "//":
    if B != 0:
        ans = A // B
    else:
        ans = "錯誤 (除數不能為 0)"
elif operator == "%":
    if B != 0:
        ans = A % B
    else:
        ans = "錯誤 (除數不能為 0)"
elif operator == "**":
    ans = A ** B
else:
    ans = "請勿輸入無效運算方式"
    
    
#輸出運算結果
if ans == "請勿輸入無效運算方式":
    print("請勿輸入無效運算方式")
elif ans == "錯誤 (除數不能為 0)":
    print("錯誤 (除數不能為 0)")
else:
    print("您的答案:{}{}{}={}".format(A,operator,B,ans))