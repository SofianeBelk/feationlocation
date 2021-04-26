using System;
namespace BankWeb.models
{
  public class Consortium
  {
    public string Name { get; set; }

    public Consortium(string _name)
    {
      this.Name = _name;
    }

    public void ConnectConsortium()
    {
      if (this.Name == "Mastercard")
      {
        
        this.ConnectMastercard();
      }
      if (this.Name == "Visa")
      {
        this.ConnectVisa();
      }
    }


    private void ConnectVisa()
    {
      Console.WriteLine("Connection to the Consortium via Visa....");
    }

    private void ConnectMastercard()
    {
      Console.WriteLine(" Connection to the Consortium via Mastercard....");
    }
  }

}