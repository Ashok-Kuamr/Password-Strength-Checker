#include<iostream>
#include<regex>
#include<string>
#include<vector>

using namespace std;

pair<string, vector<string>>
passwordStrength(const string& password){
    int score = 0;
    vector<string> suggestions;


// check password length
    if(password.length()>=8){
        score++;
    }else{
        suggestions.push_back("Password should be at least 8 character long.");
    }

// check uppercase letter
    if(regex_search(password, regex("[A-Z]"))){
        score++;
    } else {
        suggestions.push_back("Password should contain at least one uppercase letter.");
    }

//check lowercase letter
    if(regex_search(password, regex("[a-z]"))){
        score++;
    } else {
        suggestions.push_back("Password should contain at least one lowercase letter.");
    }

//check digits
    if(regex_search(password, regex("[0-9]"))){
        score++;
    } else {
        suggestions.push_back("Password should be contain at least on edigit.");
    }

//check symbols
    if(regex_search(password, regex("[~!@#$%^&*(),.?\":{}|<>]"))) {
        score++;
    } else {
        suggestions.push_back("Password should be contain at least one special character.");
    }

// password strength determine
    string strength;
    if(score==5){
        strength = "Strong";
    } else if(score==4){
        strength = "Medium";
    } else {
        strength = "Weak";
    }

    return {strength, suggestions};
}


int main(){
    string password;
    cout<<"Enter your password:";
    cin>>password;

    auto[strength, suggestions]= passwordStrength(password);

    cout<<"Password Strength:"<<strength<<"\n";
    if(!suggestions.empty()){
        cout<<"\nSuggestions to improve your password:\n";
        for(const auto& suggestion:suggestions){
            cout<<"-"<<suggestion<<"\n";
        }
    } else {
        cout<<"Yore password is strong.\n";
    }
    return 0;
}



