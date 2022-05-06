# What is Transversal:

Transversal is an open-source package that aids developers in utilizing GraphQL's dynamic querying language to auto-generate schemas, queries, and mutations on the frontend from the query template initially setup in the backend.Transversal leverages Redis' in-memory caching mechanism to quickly reference server-side caching.

## Install Transversal:

![](https://lh6.googleusercontent.com/o-e2aJ0xMYYx31zD8FYuc0PdFYfyN_FH1-qJcfXPcN3AF3rcqBRok3-GL0VFEpBApkMjplZY-_2KoMTudkr5qwRFdYm-M4uF1L8Luxf4eEfX8FaTuX5jAQO9obvKyae-hIVi1WoIOw_Ra5TQRg)

## Implementation:

### Backend Setup

Start by choosing your websocket of choice & instantiate your connection.
Setup the event listener for Transerve while passing in

_insert gif here_

Create a Transversal class using the transversal() method that will require the user to pass in their GraphQL schema and the second parameter being the Redis Client which is optional
![](https://lh6.googleusercontent.com/Pz7v2Jf3MF0dFQOaLdnSZFhDFEo0oSmlP_xCHEidO3ZuiEZSEBAczwZYYx9ryY0zLFNhyOTP6sZuNzTiOtXlpQNezpi-N7JDySdgjO-4NerbNe-vLfTjp7npNjqRtbv0uChVDmPGK87ENTEnaA)

### Basic Query Setup

Then we will call the generateFieldSchema() method to establish GraphQL’s types from database.
![](https://lh4.googleusercontent.com/ZQEVspqjZAC3RsvHRCRxr65nscTu3wHx0SgAoaZMc11Q6GatmWUayKM0CUuGGnSOp-xSuDv2QhpqRbo0u7bYQzM5T5218e2agnNuxdQ2IPySsjPKEhdpvszk_X7kktb_jNbTBWEtrRwxAUWqMQ)

### Query & Mutations

When setting up GraphQL queries or mutations, you can use TransversaL’s generateQuery() method and generateMutation() method. But first, we need to define the arguments for the resolver(if any) and the resolver itself. Then we need to pass in the query/mutation name in which we want to register it under, and the fieldschema to reference, the arguments for the resolver if any, if none then null, and the resolver. Arguments will need to be statically typed accordingly

**Query**
![](https://lh5.googleusercontent.com/nheO8gRgDGw5j1NbyosGIGMJUc4g20JVyD4R5CjQo50wo14-tAb9CwONqF-MoOZtBSVgSYGZlrxXfh_pC91jC2m3tzvG4PVoAvgy1Op1jYoeSCSXH-RzlS_z4weRQF8SJjuoUJi60v5S1j1tZQ)![](https://lh3.googleusercontent.com/MmyeJv6jizcODdnXR9c4JOJnYpHHRUpV79ylD9_IUv5ssZ4wtIgcsakMqIn1ZuBmGsbX-nvmOddxN4mVimzARK-7dHDtmTyY60vaT8nZBjPOuFIFmFIdtnjAO_9WMO1zlAUUr3cLYzXwvko5yg)
![](https://lh3.googleusercontent.com/pkmWYxFdUAryIZ5B9JLqCIXbx5zazNMMoC09LQFEBeTv3hslJLFDjIPZWVrKrcbjg9zhcnlel1PHQjXfE1z7q1SQyYN2jvF1cTg1nMwpZzt8-tMMwlP-LbeyARR7W_9mLdJcJ2XUbASrDWry5w)

**Mutation**
![](https://lh6.googleusercontent.com/xsu30cm2H0B3hF1Ve3rUtasAv-kOHeGwVatmeGUxRUrXyu2TU0jw2e-SJMuwMQVcps_cwiv8cjKt72EqsXBFddl8O8KokWjG5oa6-X0qxH3hkJC66iJJwPAqVDlzjAqL0lfBWPb-TVBbFbdMog)
![](https://lh4.googleusercontent.com/26MTNlF-tsXu7ILAOHS8-oVjmIWC0jrn3iBRAjY5s_tinHoo90NZzyDPp3xLjw9oZS5PmF2b-Qdwr5E-ZYkgxiosKt8P84Z1OQL-DgrTNjNHkAjJZ6GrsBw8fO-1jnNhZs-ohvzEV7m_coPj1g)
![](https://lh5.googleusercontent.com/wEhiE4XI_yRZK4sCg_XJIWj0g19k8xfF5oJfUrz2JMdFB9izvy-SrC160Q43uWh2z6DBGaQnM9zWqOEClaXGbODvDTWHaVP5APiEJ6sz59rVVi128YLZCF1a0fJAbkU0wTadA_Sh6YqQhuxIhg)

**Custom Schema**
Create your own field schema types on the fly by calling the generateCustomFieldSchema() method by passing in the customschema and the schema name you want it to be registered as.
![](https://lh5.googleusercontent.com/6Om10T8bO87AetjPYc0AkUrbRBHZd-5RBWfGjxoX7NACER8L-3jXZP_5jNmSj-Znkcpg2BxMwtLqqXOjUmZBe3z53I3VE0oMQHG9NEv168iIEB-05ah-YRIfd7weUkTt49M3mViCt8M4LzlTvw)![](https://lh4.googleusercontent.com/QQgxlj8X-lgh79pK8y_Q57h-9qY2U4InDRKQSTEt9ynnJ01mZ5JCaH2gkWJ6OiRR71mPCMekYZKyG6hLtiAyJRqnGwfo2s0LftEuJOsZX0aWISPU3kKuTKXI5-N5yxNUXhDVyUCZdPSdpIyGQQ)

### Redis Caching

If you prefer to use caching with your transversal package, it's simple to get started. There are two general options, local Redis service running side by side with your back-end server, or running Redis as a micro service.
As a local server:
![](https://lh5.googleusercontent.com/7rEzSCZc_EXShKSBaaBWQgWdwNil_d2WsT555mjAzC_T3pNBBr2jUXL8DrfLLBDckSoRi_hO3cLXKzcAf3w7xe0HyLzo8XDTsVRgTXoIdciTyjfqI4gy2VoA-J0z2xzIRNDB3UPlMEW5H3nrJw)
As a micro service, please see Redis` documentation [[https://docs.redis.com/latest/rs/references/client_references/client_ioredis/](https://docs.redis.com/latest/rs/references/client_references/client_ioredis/)] for specifics.

![](https://lh6.googleusercontent.com/vUPeRicPxKTLhghhaR3X3PcQLApCZ9ZAayNdZayAGFLr7xfQLxUYZ4PDe2_lAnf_8ixzPmnvEEgueNM3kHlVA5qa5SdhHUHxsPtxunGoNEMSNqQ2wmp1ULmlNkiFzh18py0QabP0YlQddF0sMg)

# What’s to come?

The Transversal team will maintain the library, optimizing where optimizable, and iterating on the tool to provide more streamlined offerings to the community.

We will be working on:

- Improving performance on large data schemas
- Adding support for relational databases
- Adding functionality and options advancing caching
- … and much more

Our hope is that we are not only saving our own time but saving the community's time as well. We hope you check out our tool and enjoy the speed and benefits of getting a project off the ground running as much as we do. Consider contributing, craft it to your needs and let us know your experience. Open issues, reach out to the team, we want to hear from you.
Thank you and this wonderful community!

## Quick Links

Try Transversal
About us
View Source Code

## The Transversal Team

Dan Forrester | [GitHub](https://github.com/daniel-forrester) | [LinkedIn](https://www.linkedin.com/in/danielforrester/)
Han Kim | [GitHub](https://github.com/han900204) | [LinkedIn](https://www.linkedin.com/in/han900204/)
Norman Liu | [GitHub](https://github.com/normsliu) | [LinkedIn](https://www.linkedin.com/in/norm-liu/)
Kevin Mun | [GitHub](https://github.com/kmun94) | [LinkedIn](https://www.linkedin.com/in/kevinmun94/)

## About GraphQL

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. -graphql.org
From Back to Front
