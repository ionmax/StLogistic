namespace StLogistics.Files.cs
{
    [Terrasoft.Core.Factories.Override]
    public class StSubstituteClass : StOriginalClass
    {
        public int Rate { get; private set; }

        
        public StSubstituteClass(int rateValue)
        {
            Rate = rateValue;
        }

        public override int GetAmount(int substValue1, int substValue2)
        {
            return (substValue1 + substValue2) * Rate;
        }
    }
}
