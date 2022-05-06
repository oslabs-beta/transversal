# What is Transversal:

Transversal is an open-source package that aids developers in utilizing GraphQL's dynamic querying language to auto-generate schemas, queries, and mutations on the frontend from the query template initially setup in the backend.Transversal leverages Redis' in-memory caching mechanism to quickly reference server-side caching.

## Install Transversal:

![](https://lh6.googleusercontent.com/o-e2aJ0xMYYx31zD8FYuc0PdFYfyN_FH1-qJcfXPcN3AF3rcqBRok3-GL0VFEpBApkMjplZY-_2KoMTudkr5qwRFdYm-M4uF1L8Luxf4eEfX8FaTuX5jAQO9obvKyae-hIVi1WoIOw_Ra5TQRg)

### Implementation:

### Frontend Setup:

**Get Started**

Import TransversalClient and instantiate it with your preferred endpoint to setup WebSocket connection

![](https://lh3.googleusercontent.com/D_Ffsh0JQxMtoO-44_ld5ojsvnip-xZS1J2Tz_9_3_-LOSV0scHQyMS2L2Hkt2KsKtnukbsCDaK_tq1Ea10vfECNkxCPQgjJ9s6B_Gf1BuO3KQA-WmaOy3aZdkfB1IntPhniIBeqRqsPdTvpBw)

call the getTransversalInstance() method to get the gql object containing all the queries and mutations templates needed to make API calls and store it in some state where it can be accessed

## ![](https://lh5.googleusercontent.com/oq_S8bXPrZdidXTQXMcdV29fbWiVyN5lRGz7q4sbFcD5TdvsEH7X3apec6-oQOWfevebOsuS4bR0fNg0GUNihFleYpJRWlxZcveTkUfQxb4X9jlaJjhRMOspMA2fSzGYDzu0y4-VeYl_aqfQ1g)

## Making Queries/Mutations

To make your query/mutation API call, call the transversalQuery() method and pass in a few arguments. You would first need to specify the name of the query or mutation, arguments required (that was setup on the backend previously), specify if you want the call to come from the cache or server, and the last argument can be omitted if you want everything to be returned from the api call, if not, you will have to pass in a custom shape(string) for your data to fill.

## ![](https://lh4.googleusercontent.com/l6h3h7Sg0HjA9ijiJM9o-hYWhZC9fDRxukxKY7B5DemQ_JU5-1TPtVIl80rRfQMIs6fGNIuY1gmwnV_yDlbWt7QRiY92iHhdOQPZbCj8a1Cp07I8k5J-3QCe1b2ENClYisr-RJNn5E8aNEsJrA)

## ![](https://lh6.googleusercontent.com/tkjpyHy7HqnY5-GT-T2nufoHgwpOmMJnhn3SqIOoM-uIVE0iZspYDPouFGV2pfmt4d-_mlbkNaQScC-8sGtX-66dZ4f-4EqaN8gmYrCni0MkaN_8dgKKmAvp19QVkBp5E9SBPBPLHqWv1K8tLg)

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

---
