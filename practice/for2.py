#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#N = int(input("請輸入數字："))

#for i in range(N, 0, -1):
#    print("@" * i)

#倒直接三角形    
N = int(input("請輸入數字："))

for i in range(N, 0, -1):
    print(" " * (N - i) + "@" * i)
    
# 正三角形
N = int(input("請輸入數字："))

for i in range(1 , N+1):
    print(" " * (N - i) + "@" *  (2 * i - 1))