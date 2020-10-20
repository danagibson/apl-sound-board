// Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

/**
 * This file defines the different Handlers & Interceptors 
 * used to handle Requests sent by the Alexa Service
 */

/////////////////////////////////
// Modules Definition
/////////////////////////////////
// ASK SDK
const Alexa = require('ask-sdk-core');
const SoundBoardDoc = require('SoundBoard.json');

function supportsAPL(handlerInput) {
    const supportedInterfaces = Alexa.getSupportedInterfaces(handlerInput.requestEnvelope);
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    console.log("Before supported");
    console.log(aplInterface);
    console.log("After supported");
    return aplInterface !== null && aplInterface !== undefined;
}

// Handlers Definition
/////////////////////////////////

/**
 * Handles LaunchRequest requests sent by Alexa
 * Note : this type of request is send when the user invokes your skill without providing a specific intent.
 */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
      const speakOutput = 'Welcome, you can push a button or ask for a sound. Which sound would you like to try?';
    if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.4',
            document: SoundBoardDoc
        });
    }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      const speakOutput = "Push a button or say which sound you want palyer."
      const repromptOutput = "Pick a sound."
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const CricketEventHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.source.id === 'cricketButton';
  },
  handle(handlerInput) 
    {
      return handlerInput.responseBuilder
        .addDirective
        ({
            "type": "Alexa.Presentation.APLA.RenderDocument",
            "token": "launch_a",
            "document": 
                {
                     "type": "Link",
                     "src":  "doc://alexa/apla/documents/CricketSound",
                },
            "datasources": 
                {
                }
        })
        .getResponse();
  },
};

const RimshotEventHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.source.id === 'rimshotButton';
  },
  handle(handlerInput) 
    {
      return handlerInput.responseBuilder
        .addDirective
        ({
            "type": "Alexa.Presentation.APLA.RenderDocument",
            "token": "launch_a",
            "document": 
                {
                     "type": "Link",
                     "src":  "doc://alexa/apla/documents/RimshotSound",
                },
            "datasources": 
                {
                }
        })
        .getResponse();
  },
};

const GollumEventHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.source.id === 'gollumButton';
  },
  handle(handlerInput) 
    {
      return handlerInput.responseBuilder
        .addDirective
        ({
            "type": "Alexa.Presentation.APLA.RenderDocument",
            "token": "launch_a",
            "document": 
                {
                     "type": "Link",
                     "src":  "doc://alexa/apla/documents/GollumSound",
                },
            "datasources": 
                {
                }
        })
        .getResponse();
  },
};

const VillainEventHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.source.id === 'villainButton';
  },
  handle(handlerInput) 
    {
      return handlerInput.responseBuilder
        .addDirective
        ({
            "type": "Alexa.Presentation.APLA.RenderDocument",
            "token": "launch_a",
            "document": 
                {
                     "type": "Link",
                     "src":  "doc://alexa/apla/documents/VillainSound",
                },
            "datasources": 
                {
                }
        })
        .getResponse();
  },
};

const VoiceEventHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.source.id === 'voiceButton';
  },
  handle(handlerInput) 
    {
      return handlerInput.responseBuilder
        .addDirective
        ({
            "type": "Alexa.Presentation.APLA.RenderDocument",
            "token": "launch_a",
            "document": 
                {
                     "type": "Link",
                     "src":  "doc://alexa/apla/documents/VoiceSound",
                },
            "datasources": 
                {
                }
        })
        .getResponse();
  },
};

/**
 * Handles AMAZON.CancelIntent & AMAZON.StopIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.CancelIntent & AMAZON.StopIntent intents defined in your intent schema.
 */
const ExitHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = handlerInput.t('STOP_MESSAGE');
    // Generate the JSON Response
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = handlerInput.t('REFLECTOR_MESSAGE', { intentName: intentName });
    // Generate the JSON Response
    return handlerInput.responseBuilder
      .speak(speakOutput)
      //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
      .getResponse();
  }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    // Any cleanup logic goes here.
    // Generate the JSON Response
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput = handlerInput.t('ERROR_MESSAGE');
    console.log(`~~~~ Error handled: ${error.stack}`);
    // Generate the JSON Response
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/////////////////////////////////
// Interceptors Definition
/////////////////////////////////

/**
 * This request interceptor will bind a translation function 't' to the handlerInput
 */
/**
 * This request interceptor will log all incoming requests in the associated Logs (CloudWatch) of the AWS Lambda functions
 */
const LoggingRequestInterceptor = {
  process(handlerInput) {
    console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
  }
};

/**
* This response interceptor will log all outgoing responses in the associated Logs (CloudWatch) of the AWS Lambda functions
*/
const LoggingResponseInterceptor = {
  process(handlerInput, response) {
    console.log(`Outgoing response: ${JSON.stringify(response)}`);
  }
};

/////////////////////////////////
// SkillBuilder Definition
/////////////////////////////////

/**
 * The SkillBuilder acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom.
 */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpHandler,
    CricketEventHandler,
    RimshotEventHandler,
    GollumEventHandler,
    VillainEventHandler,
    VoiceEventHandler,
    ExitHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addRequestInterceptors(
    LoggingRequestInterceptor
  )
  .addResponseInterceptors(
    LoggingResponseInterceptor
  )
  .withCustomUserAgent('sample/hello-world/v1.2')
  .lambda();