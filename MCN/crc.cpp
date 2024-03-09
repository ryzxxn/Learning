#include <stdio.h>
#include <iostream>

using namespace std;

int message[10];
int message_len = 0;
int i = 0;

void getParam()
{
    cout<<"enter the lenght of message: ";
    cin>>message_len;
    for(i = 0; i < message_len; i++)
    {
        cin>>message[i];
    }
}

int main()
{
    getParam();
    cout << "Entered message: ";
    for (i = 0; i < message_len; i++)
    {
        cout << message[i] << " ";
    }
};