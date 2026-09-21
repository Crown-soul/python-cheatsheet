# # %%
# X = 5
# Y = 3
# Z = X + Y

# print(X, Y, Z)

# # %%
# TAX = 0.05
# Coffee = input("Enter the price of coffee: ")
# print(Coffee)

# print("The price of coffee is: ", int(Coffee) * (1-TAX))

# # %%
# num = int(input("Enter a number: "))
# print("The number you entered is: ", num)

# if num == 100:
#     print("猜中了")
# else:
#     print("猜不中")
# # %%
# num = int(input("Enter a number: "))
# print("The number you entered is: ", num)

# if num == 100:
#     print("校長獎")
# elif num >= 90:
#     print("優")
# elif num >= 80:
#     print("甲")
# elif num >= 70:
#     print("乙")
# elif num >= 60:
#     print("丙")
# else:
#     print("丁")
# # %%
# weight = float(input("Enter your weight in kg:"))
# height = float(input("Enter your height in cm:"))
# print("Your weight is: ", weight)
# print("Your height is: ", height)

# if height >= 160 and weight >= 50:
#     print("符合標準")

# if height >= 180 or weight >= 90:
#     print("體型較大")
# %%
# name = input("Enter your name: ")
# age = int(input("Enter your age: "))
# print("Your name is: ", name)
# print("Your age is: ", age)

# print(name, "今年", age, "歲")
# print("%s 今年 %d 歲" % (name, age))
# print( f"{name} 今年 {age} 歲")   

# %%
name = input("Enter your name: ")
num = int(input("Enter a number: "))
setNum = int(input("Enter a set number: "))

if num >= 90:
    score = "優"
elif num >= 80 and num < 90:
    score = "甲"
elif num >= 70 and num < 80:
    score = "乙"
elif num >= 60 and num < 70:
    score = "丙"
else:   
    score = "丁"

print(f"{name} 的段考成績是 {num} 分，等第是 {score}")

if num >= 85 or (num >= 70 and setNum >= 15):
    print("符合獎學金申請資格")