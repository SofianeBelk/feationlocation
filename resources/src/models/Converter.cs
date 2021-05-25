using System;

namespace BankWeb.models
{
  public class Converter
  {

    public Consortium Consortium { get; set; }
    public Converter(Consortium _consortium)
    {
      this.Consortium = _consortium;
      Console.WriteLine("Create Converter connexion");
    }
    public long Convert(long _currency1, long _currency2)
    {
      Console.WriteLine("Conversion From :" + _currency1 + " TO " + _currency2);
      this.Consortium.ConnectConsortium();
      return _currency1 / _currency2;

    }
  }
}