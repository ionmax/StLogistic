using global::Common.Logging;
using Terrasoft.Configuration;
using Newtonsoft.Json;
using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Web;
using System.Runtime.Serialization;
using Terrasoft.Web.Common;
using Terrasoft.Core;
using Terrasoft.Web.Http.Abstractions;
using System.Collections.Generic;
using Terrasoft.Core.Process;
using Terrasoft.Core.Process.Configuration;
using Terrasoft.Common;
using Limilabs.Barcode;

namespace StLogisticDriverServiceNamespace
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class StWebSocketTestService : BaseService
	{
		private static readonly ILog _log = LogManager.GetLogger("MyTestLogger");
		private const string _messageSender = "ShowInformationWindowTest";

		[OperationContract]
		[WebInvoke(Method = "POST", UriTemplate = "ShowInformationWindow",
		RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
		public string ShowInformationWindow(TestDTO testData)
		{
			_log.InfoFormat($"MyTestLogger: Parameters - {testData.TestString} - \"{testData.TestGuid}\" - {testData.TestDate} - {testData.TestNumber}");
			_log.Warn("Test warn");
			_log.Error("Test error");

			var messageData = new
			{
				testString = testData.TestString,
				testGuid = testData.TestGuid,
				testDate = testData.TestDate,
				testNumber = testData.TestNumber
			};

			string messageBody = JsonConvert.SerializeObject(messageData);

			MsgChannelUtilities.PostMessage(UserConnection, _messageSender, messageBody);
			//MsgChannelUtilities.PostMessageToAll(_messageSender, messageBody);

			return "Message sent";
		}

		[OperationContract]
		[WebInvoke(Method = "POST", UriTemplate = "TestRunProcess",
		RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
		public void TestRunProcess(string message)
		{
			var userConnection = HttpContext.Current.Session["UserConnection"] as UserConnection;
			
			//Without parameters
			var manager = userConnection.ProcessSchemaManager;
			var processSchema = manager.GetInstanceByName("StTestRunProcessProcess");
			Process process = processSchema.CreateProcess(UserConnection);
			//extention method from Terrasoft.Common (weird)
			if (processSchema.Parameters.ExistsByName("Message")) {
				process.SetPropertyValue("Message", "Test message from back-end");
			}
			///var bar = new Barcode128();
			process.Execute(UserConnection);
			var parameters = new Dictionary<string, string>();
			parameters["Message"] = "Test message from back-end";
			userConnection.ProcessEngine.ProcessExecutor.Execute("StTestRunProcessProcess", parameters);

			/*
			var flowEngine = new Terrasoft.Core.Process.FlowEngine(userConnection);
			Dictionary<string, object> parameter = new Dictionary<string, object>();
			parameter.Add("CarId", car_id);
			flowEngine.RunProcess(processSchema, parameter);
			*/
		}

		[DataContract(Name = "testData")]
		public class TestDTO{
			[DataMember(Name = "testString")]
			public string TestString { get; set; }
			[DataMember(Name = "testGuid")]
			public Guid TestGuid { get; set; }
			[DataMember(Name = "testDate")]
			public string TestDate { get; set; }
			[DataMember(Name = "testNumber")]
			public decimal TestNumber { get; set; }
		}
	}
}