"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TransversalQuery extends require('./SchemaGenerator') {
    constructor(MongoModels) {
        super(MongoModels);
        this.gql = {};
        this.transversalQuery = (gql, variables, cacheOption = false, custom) => __awaiter(this, void 0, void 0, function* () {
            if (custom) {
                const pattern = /^.+{$/gm;
                const queryString = pattern.exec(gql);
                const queryString2 = pattern.exec(gql);
                gql =
                    queryString +
                        '\n' +
                        queryString2 +
                        '\n' +
                        custom +
                        '\n' +
                        '}' +
                        '\n' +
                        '}';
            }
            const request = (endpoint, gql, variables) => __awaiter(this, void 0, void 0, function* () {
                const res = yield fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        query: gql,
                        variables: variables,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => data);
                return res;
            });
            if (!cacheOption) {
                console.log('caching option not selected');
                const res = yield request('/graphql', gql, variables);
                return res;
            }
            else {
                console.log('caching option selected!');
                const res = yield fetch('/transversal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        query: gql,
                        variables: variables,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => data);
                return res;
            }
        });
    }
}
module.exports = TransversalQuery;
