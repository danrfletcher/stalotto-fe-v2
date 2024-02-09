//Mock queries
export const featuredCompetitionDataQuery_ShouldSucceed = `
{
  products(filter: { feature_this_competition: { eq: "1" } }) {
    items {
      id
			name
			thumbnail {
				url
			}
			... on VirtualProduct {
				original_price
				competition_closes_on
				starting_ticket_qtd
			}
			price_range {
				minimum_price {
          final_price {
            value
            currency
          }
        }
			}
    }
  }
}
`;

export const featuredCompetitionDataQuery_ShouldFail200_TreatAs400 = `
{
    products(filter: { feature_this_competition: { eq: "1" } }) {
      items {
        id
              name
              thumbnail {
                  url
              }
              ... on VirtualProduct {
                  original_price
                  competition_closes_on
                  starting_ticket_qtd
              }
              price_range {
                  minimum_price {
            final_price {
              value
              currency
            }
          }
              }
              invalid_prop
      }
    }
  }
`;

export const featuredCompetitionDataQuery_ShouldFail500_TreatAs400 = `
{
    products(filter: { feature_this_competition: { eq: "1" } }) {
      items {
        id
              name
              thumbnail {
                  url
              }
              ... on InvalidProduct {
                  original_price
                  competition_closes_on
                  starting_ticket_qtd
              }
              price_range {
                  minimum_price {
            final_price {
              value
              currency
            }
          }
              }
      }
    }
  }
`;

export const featuredCompetitionDataQuery_ShouldFail500 = `
{
    products(filter: { feature_this_competition: { eq: "1" } }) {
      items {
        id
              name
              thumbnail {
                  url
              }
              ... on InvalidProduct {
                  original_price
                  competition_closes_on
                  starting_ticket_qtd
              }
              price_range {
                  minimum_price {
            final_price {
              value
              currency
            }
          }
              }
      }
    }
  }
`;

// Mock responses
export const featuredCompetitionsResponse_200 = {
    "data": {
        "data": {
            "products": {
                "items": [
                    {
                        "id": 3,
                        "name": "Land Rover Defender Ambulance",
                        "thumbnail": {
                            "url": "https://magento.stalotto.test/media/catalog/product/cache/79395e00ea6bc4fa294d4b8b87ada9cc/d/e/defender-ambulance.png"
                        },
                        "original_price": null,
                        "competition_closes_on": "2024-01-31 13:54:00",
                        "starting_ticket_qtd": "1000",
                        "price_range": {
                            "minimum_price": {
                                "final_price": {
                                    "value": 10,
                                    "currency": "GBP"
                                }
                            }
                        }
                    },
                    {
                        "id": 1,
                        "name": "Volvo 940",
                        "thumbnail": {
                            "url": "https://magento.stalotto.test/media/catalog/product/cache/79395e00ea6bc4fa294d4b8b87ada9cc/v/o/volvo-940-black-1_1.png"
                        },
                        "original_price": 5.5,
                        "competition_closes_on": "2024-01-31 16:59:00",
                        "starting_ticket_qtd": "1000",
                        "price_range": {
                            "minimum_price": {
                                "final_price": {
                                    "value": 1.9,
                                    "currency": "GBP"
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "cache-control": "max-age=0, must-revalidate, no-cache, no-store",
        "content-type": "application/json",
        "expires": "Tue, 07 Feb 2023 16:33:15 GMT",
        "pragma": "no-cache"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "https://magento.stalotto.test/graphql",
        "data": "{\"query\":\"\\n{\\n  products(filter: { feature_this_competition: { eq: \\\"1\\\" } }) {\\n    items {\\n      id\\n\\t\\t\\tname\\n\\t\\t\\tthumbnail {\\n\\t\\t\\t\\turl\\n\\t\\t\\t}\\n\\t\\t\\t... on VirtualProduct {\\n\\t\\t\\t\\toriginal_price\\n\\t\\t\\t\\tcompetition_closes_on\\n\\t\\t\\t\\tstarting_ticket_qtd\\n\\t\\t\\t}\\n\\t\\t\\tprice_range {\\n\\t\\t\\t\\tminimum_price {\\n          final_price {\\n            value\\n            currency\\n          }\\n        }\\n\\t\\t\\t}\\n    }\\n  }\\n}\\n\"}"
    },
    "request": {}
};

export const featuredCompetitionsResponse_204 = {
"data": {
    "data": {
        "products": {
                "items": []
            }
        }
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "cache-control": "max-age=0, must-revalidate, no-cache, no-store",
        "content-type": "application/json",
        "expires": "Tue, 07 Feb 2023 16:29:51 GMT",
        "pragma": "no-cache"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "https://magento.stalotto.test/graphql",
        "data": "{\"query\":\"\\n{\\n  products(filter: { feature_this_competition: { eq: \\\"1\\\" } }) {\\n    items {\\n      id\\n\\t\\t\\tname\\n\\t\\t\\tthumbnail {\\n\\t\\t\\t\\turl\\n\\t\\t\\t}\\n\\t\\t\\t... on VirtualProduct {\\n\\t\\t\\t\\toriginal_price\\n\\t\\t\\t\\tcompetition_closes_on\\n\\t\\t\\t\\tstarting_ticket_qtd\\n\\t\\t\\t}\\n\\t\\t\\tprice_range {\\n\\t\\t\\t\\tminimum_price {\\n          final_price {\\n            value\\n            currency\\n          }\\n        }\\n\\t\\t\\t}\\n    }\\n  }\\n}\\n\"}"
    },
    "request": {}
}

export const featuredCompetitionsResponse_200_TreatAs400 = {
    "data": {
        "errors": [
            {
                "message": "Cannot query field \"invalid_prop\" on type \"ProductInterface\".",
                "locations": [
                    {
                        "line": 23,
                        "column": 4
                    }
                ]
            }
        ]
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "cache-control": "max-age=0, must-revalidate, no-cache, no-store",
        "content-type": "application/json",
        "expires": "Tue, 07 Feb 2023 16:40:07 GMT",
        "pragma": "no-cache"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "https://magento.stalotto.test/graphql",
        "data": "{\"query\":\"\\n{\\n  products(filter: { feature_this_competition: { eq: \\\"1\\\" } }) {\\n    items {\\n      id\\n\\t\\t\\tname\\n\\t\\t\\tthumbnail {\\n\\t\\t\\t\\turl\\n\\t\\t\\t}\\n\\t\\t\\t... on VirtualProduct {\\n\\t\\t\\t\\toriginal_price\\n\\t\\t\\t\\tcompetition_closes_on\\n\\t\\t\\t\\tstarting_ticket_qtd\\n\\t\\t\\t}\\n\\t\\t\\tprice_range {\\n\\t\\t\\t\\tminimum_price {\\n          final_price {\\n            value\\n            currency\\n          }\\n        }\\n\\t\\t\\t}\\n\\t\\t\\tinvalid_prop\\n    }\\n  }\\n}\\n\"}"
    },
    "request": {}
}

export const featuredCompetitionsResponse_500_TreatAs400 = {
    "data": {
        "errors": [
            {
                "message": "Internal server error",
                "extensions": {
                    "debugMessage": "Config element \"InvalidProduct\" is not declared in GraphQL schema",
                    "file": "/var/www/html/vendor/magento/framework/GraphQl/Config.php",
                    "line": 57,
                    "trace": [
                        {
                            "file": "/var/www/html/vendor/magento/framework/GraphQl/Schema/Type/TypeRegistry.php",
                            "line": 68,
                            "call": "Magento\\Framework\\GraphQl\\Config::getConfigElement('InvalidProduct')"
                        },
                    ]
                }
            }
        ]
    },
    "status": 500,
    "statusText": "",
    "headers": {
        "cache-control": "max-age=0, must-revalidate, no-cache, no-store",
        "content-type": "application/json",
        "expires": "Tue, 07 Feb 2023 16:40:33 GMT",
        "pragma": "no-cache"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "https://magento.stalotto.test/graphql",
        "data": "{\"query\":\"\\n{\\n  products(filter: { feature_this_competition: { eq: \\\"1\\\" } }) {\\n    items {\\n      id\\n\\t\\t\\tname\\n\\t\\t\\tthumbnail {\\n\\t\\t\\t\\turl\\n\\t\\t\\t}\\n\\t\\t\\t... on InvalidProduct {\\n\\t\\t\\t\\toriginal_price\\n\\t\\t\\t\\tcompetition_closes_on\\n\\t\\t\\t\\tstarting_ticket_qtd\\n\\t\\t\\t}\\n\\t\\t\\tprice_range {\\n\\t\\t\\t\\tminimum_price {\\n          final_price {\\n            value\\n            currency\\n          }\\n        }\\n\\t\\t\\t}\\n    }\\n  }\\n}\\n\"}"
    },
    "request": {}
}

export const featuredCompetitionsResponse_500 = {
    "data": {
        "errors": [
            {
                "message": "Internal server error",
                "extensions": {
                    "debugMessage": "Unrecognised debug message",
                    "file": "/var/www/html/vendor/magento/framework/GraphQl/Config.php",
                    "line": 57,
                    "trace": [
                        {
                            "file": "/var/www/html/vendor/magento/framework/GraphQl/Schema/Type/TypeRegistry.php",
                            "line": 68,
                            "call": "Magento\\Framework\\GraphQl\\Config::getConfigElement('InvalidProduct')"
                        },
                    ]
                }
            }
        ]
    },
    "status": 500,
    "statusText": "",
    "headers": {
        "cache-control": "max-age=0, must-revalidate, no-cache, no-store",
        "content-type": "application/json",
        "expires": "Tue, 07 Feb 2023 16:40:33 GMT",
        "pragma": "no-cache"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "https://magento.stalotto.test/graphql",
        "data": "{\"query\":\"\\n{\\n  products(filter: { feature_this_competition: { eq: \\\"1\\\" } }) {\\n    items {\\n      id\\n\\t\\t\\tname\\n\\t\\t\\tthumbnail {\\n\\t\\t\\t\\turl\\n\\t\\t\\t}\\n\\t\\t\\t... on InvalidProduct {\\n\\t\\t\\t\\toriginal_price\\n\\t\\t\\t\\tcompetition_closes_on\\n\\t\\t\\t\\tstarting_ticket_qtd\\n\\t\\t\\t}\\n\\t\\t\\tprice_range {\\n\\t\\t\\t\\tminimum_price {\\n          final_price {\\n            value\\n            currency\\n          }\\n        }\\n\\t\\t\\t}\\n    }\\n  }\\n}\\n\"}"
    },
    "request": {}
}