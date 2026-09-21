#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb  3 21:49:05 2025

@author: murmursoul
"""

#定義變數
#N = int(input("請輸入數字："))

#執行
#for i in range(1, N+1):
#    print("@" * N)
    
#定義變數
N = int(input("請輸入數字："))

#執行
for i in range(1, N+1):
    print(" " * (N-i) + "@" * i)
