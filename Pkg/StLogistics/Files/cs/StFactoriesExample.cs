namespace StLogistics.Files.cs
{
    public class StFactoriesExample
    {
        public void Example ()
        {
            //Created by new operator
            var substObjectByNew = new StOriginalClass();
            //Created by factory
            var substObjectByFactory = Terrasoft.Core.Factories.ClassFactory.Get<StOriginalClass>(
                                                    new Terrasoft.Core.Factories.ConstructorArgument("rateValue", 2));

            // Call StOriginalClass GetAmount method. Result 15
            int resultByNew = substObjectByNew.GetAmount(5, 10);

            // Call StSubstituteClass GetAmount method. Result 30
            int resultByFactory = substObjectByFactory.GetAmount(5, 10);
        }
    }
}
