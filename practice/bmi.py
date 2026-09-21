#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jan 30 23:58:35 2025

@author: murmursoul
"""

height = eval( input("請輸入身高（CM）：") )
weight = eval( input("請輸入體重（KG）：") )

bmi = weight/((height/100)**2)
print("此人的BMI為：",int(bmi))
