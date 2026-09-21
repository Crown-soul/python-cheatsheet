#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Feb  1 22:52:12 2025

@author: murmursoul
"""

X1 = float(input("輸入A點的X座標:"))
Y1 = float(input("輸入A點的Y座標:"))
X2 = float(input("輸入B點的X座標:"))
Y2 = float(input("輸入B點的Y座標:"))
distance = ((X1-X2)**2+(Y1-Y2)**2)**0.5

print("A點座標為({},{})".format(X1, X2))
print("B點座標為({},{})".format(Y1, Y2))
print("2點距離為：{:.4f}".format(distance))