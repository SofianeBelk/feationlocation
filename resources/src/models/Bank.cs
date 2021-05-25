using System;
using System.Collections.Generic;


namespace BankWeb.models
{
  public class Bank
  {
    private Converter Converter { set; get; }

    private Consortium Consortium { get; set; }

    private string Name { set; get; }

    private List<Account> accounts = new List<Account>();

    public Bank(string _name)
    {
      this.Name = _name;
      this.Consortium = new Consortium("CB");
      this.Converter = new Converter(this.Consortium);
    }



    public void AddAccount(Account _account)
    {
      Console.WriteLine("Adding account ...");
      this.accounts.Add(_account);
    }

    public void RemoveAccount(Account _account)
    {
      Console.WriteLine("Removing account ...");
      this.accounts.Remove(_account);
    }
  }
}