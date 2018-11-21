# addBots-Open-WebChatPlugin

addBots is a Munich-based company that works with its customers to build the future of digital interaction. Reinvent frontend is the motto according to which the team develops radically simple, personal and intelligent ways of communication between people and their technology, regardless of old conventions. The result is experiences that inspire users while creating minimal administrative overhead for customers.

addBots offers the web chat plugin for free to use under **Apache2.0** license and does not provide the backend solution, it's just the frontend  but a sample backend server will be published soon.

## Getting Started

The Plugin is written in Reactjs using TypeScript  

### Prerequisites

First, you should install the latest version of NodeJS

https://nodejs.org/en/

### Installing

After cloning, go to the root folder from the terminal and run :

```
npm install
```

## Running 

```
npm start
```

### Sending messages to the Plugin

Sending a simple text Message with a quick replies (optional)

```
{
    "statusCode": 200,  
    "connected": true,
    "type": "new_message",
    "payload": {
        "messaging_type": "RESPONSE", "recipient": { "id": "<USERID>" },
        "message": { "text": <textMessage> 
                     "quick_replies?": 
                     [
                        { "content_type": "text", "title": "<text>", "payload": "<Payload>" },
                        ... 
                    ]
        }, 
        "timestamp": <Timestamp in miliseconds>
    }
}
```

Sending a carousel with buttons(optional) 

```
{
    "statusCode": 200,
    "connected": true,
    "type": "new_message",
    "payload": {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": "<<USERID>>"
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "image_url": "<URL>",
                            "title": "<text>",
                            "subtitle": "<text>",
                            "buttons?": [
                                {
                                    "type":"postback",
                                    "title":"<text>",
                                    "payload":"<payload>"
                                },
                                {
                                    "type":"web_url",
                                    "title":"<text>",
                                    "url": "<URL>"
                                },
                                ...
                            ]
                        },
                        ...
                    ],
                    "sharable": <true | false>
                }
            }
        },
        "timestamp": <Timestamp in miliseconds>
    }
}
```


### Configuring the Plugin

To run in the development environment you wil need to add the configurations in the file dev.ts

Example of config keys

```
			'header': {
				'iconUrl': '',
				'closeButtonUrl': ''
			},
			'floatingButton': {
				'iconUrl': ''
			}

```


## Deployment

TODO

## Built With

* [NodeJS](https://nodejs.org/en/) - The javascript framework
* [Reactjs](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Typescript](https://www.typescriptlang.org/) - For easier OOP javascript


## Contributing

TODO

## Versioning

TODO

## Authors

* **Moataz ibrahim ** 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the Apache2.0 License - see the [LICENSE.md](LICENSE.md) file for details

