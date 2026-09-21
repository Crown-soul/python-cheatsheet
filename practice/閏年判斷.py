#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb  2 14:02:51 2025

@author: murmursoul
"""

#定義變數
Year = int(input("請輸入西元年："))

#運算判斷，用 if 完成
#確認是不是 400的倍數
if Year % 400 == 0:
    print("西元{}年是閏年".format(Year))
#排除100的倍數
elif Year % 100 == 0: 
    print("西元{}年不是閏年".format(Year))
#確認是不是 4的倍數
elif Year % 4 == 0:     
    print("西元{}年是閏年".format(Year))
else:
    print("西元{}年不是閏年".format(Year))