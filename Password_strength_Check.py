import re

def password_strength(password):
    score = 0
    suggestions  =[]

    #check password length
    if len(password)>=8:
        score += 1
    else:
        suggestions.append("Password should be at least 8 characters long,")

    #check for uppercase letter
    if re.search(r'[A-Z]', password):
        score +=1
    else:
        suggestions.append("password should be contain atleast one uppercse letter.")

    #check for lowercase letter
    if re.search(r'[a-z]', password):
        score += 1
    else:
        suggestions.append("Password should be contain atleast one lowercase letter.")

    #check for digits
    if re.search(r'[0-9]', password):
        score +=1
    else:
        suggestions.append("Pasword should be contain atleast onr digit.")

    #check for special character
    if re.search(r'[!@#$%^&*(),.?:|<>]', password):
        score +=1
    else:
        suggestions.append("Password should contain at least one special character.")

    #Determine password strength
    if score == 5:
        strength = "Strong"
    elif score == 4:
        strength = "Medium"
    else:
        strength = "Weak"

    return strength, suggestions

# Test the function
password = input("Enter your password:")
strength, suggestions = password_strength(password)

print(f"Password Strength:{strength}")
if suggestions:
    print("\nSuggestions to improve your password:")
    for suggestion in suggestions:
        print(f"-{suggestion}")
else:
    print("Your password is strong.")