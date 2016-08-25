import {Injectable}                                 from '@angular/core';
import {Observable}                                 from 'rxjs/Rx';
import {AngularFire, AuthProviders, AuthMethods}    from 'angularfire2';

import {TNObject} from '../base/theory.base.object';

@Injectable()
export class TNFirebaseAuth extends TNObject
{
    private _authenticated:boolean = false;
    private _username:string       = '';
    private _authData:Object       = null;

    constructor()
    {
        super();
    }

    login(options:Object) : Observable<Object>
    {
/*
        var
        self        = this,
        provider    = options.provider,
        authOptions = {session : this.properties.session},
        q           = $q.defer(),
        username    = options.username,
        password    = options.password,
        foundUser   = options.found,
        authPromise,

        runAuthPromise = function()
        {
            authPromise.then(function(authData)
            {
                self.setUserFromAuth({authData : authData, username : username}).then(function(data)
                {
                    q.resolve(data);
                }).

                catch(function(error)
                {
                    q.reject(error);
                });
            }).

            catch(function(error)
            {
                q.reject(error);
            });
        },

        createUser = function()
        {
            self.createUser({username : username, password : password}).then(function(data)
            {
                authWithPassword();
            });
        },

        authWithPassword = function()
        {
            authPromise = firebaseAuth.$authWithPassword({email : username, password : password}, authOptions);

            runAuthPromise();
        },

        checkAndAuthUser = function()
        {
            if (foundUser)
            {
                authWithPassword();
            }
            else
            {
                createUser();
            }
        },

        findAndAuthUser = function()
        {
            Username.find(username).then(function(usernameData)
            {
                console.log(usernameData);

                if (usernameData.username)
                {
                    foundUser = true;
                }

                checkAndAuthUser();
            });
        };

        if (provider !== PROVIDER_SIMPLE)
        {
            authPromise = firebaseAuth.$authWithOAuthPopup(provider, authOptions);

            runAuthPromise();
        }
        else if (username && password)
        {
            if (options.register)
            {
                if (options.checkUser)
                {
                    findAndAuthUser();
                }
                else
                {
                    checkAndAuthUser();
                }
            }
            else
            {
                if (options.checkUser)
                {
                    findAndAuthUser();
                }
                else
                {
                    authWithPassword();
                }
            }
        }
        else
        {
            if (!username)
            {
                q.reject('Invalid username');
            }
            else
            {
                q.reject('Invalid password');
            }
        }

        return q.promise;
*/
    }

    logout() : Observable<Object>
    {

    }

    usernameIsValid(username:String) : Observable<Object>
    {

    }

    session() : Observable<Object>
    {

    }

    setUserFromAuth(options:Object) : Observable<Object>
    {

    }

    createUser(options:Object) : Observable<Object>
    {

    }

    get authenticated():boolean
    {
        return this._authenticated;
    }
    
    set authenticated(authenticated:boolean)
    {
        this._authenticated = authenticated;
    }

    get username():boolean
    {
        return this._username;
    }
    
    set username(username:boolean)
    {
        this._username = username;
    }

    get authData():Object
    {
        return this._authData;
    }
    
    set authData(authData:boolean)
    {
        this._authData = authData;
    }
}

/*

factory('TNFirebaseAuth', function($firebaseAuth, $firebaseObject, $q, TNObject, User, Username, FIREBASE_URL, PROVIDER_SIMPLE, PROVIDER_FACEBOOK, PROVIDER_TWITTER, PROVIDER_GOOGLE, PROVIDER_GITHUB)
{
    TNFirebaseAuth.prototype.login = function(options)
    {
        var
        self        = this,
        provider    = options.provider,
        authOptions = {session : this.properties.session},
        q           = $q.defer(),
        username    = options.username,
        password    = options.password,
        foundUser   = options.found,
        authPromise,

        runAuthPromise = function()
        {
            authPromise.then(function(authData)
            {
                self.setUserFromAuth({authData : authData, username : username}).then(function(data)
                {
                    q.resolve(data);
                }).

                catch(function(error)
                {
                    q.reject(error);
                });
            }).

            catch(function(error)
            {
                q.reject(error);
            });
        },

        createUser = function()
        {
            self.createUser({username : username, password : password}).then(function(data)
            {
                authWithPassword();
            });
        },

        authWithPassword = function()
        {
            authPromise = firebaseAuth.$authWithPassword({email : username, password : password}, authOptions);

            runAuthPromise();
        },

        checkAndAuthUser = function()
        {
            if (foundUser)
            {
                authWithPassword();
            }
            else
            {
                createUser();
            }
        },

        findAndAuthUser = function()
        {
            Username.find(username).then(function(usernameData)
            {
                console.log(usernameData);

                if (usernameData.username)
                {
                    foundUser = true;
                }

                checkAndAuthUser();
            });
        };

        if (provider !== PROVIDER_SIMPLE)
        {
            authPromise = firebaseAuth.$authWithOAuthPopup(provider, authOptions);

            runAuthPromise();
        }
        else if (username && password)
        {
            if (options.register)
            {
                if (options.checkUser)
                {
                    findAndAuthUser();
                }
                else
                {
                    checkAndAuthUser();
                }
            }
            else
            {
                if (options.checkUser)
                {
                    findAndAuthUser();
                }
                else
                {
                    authWithPassword();
                }
            }
        }
        else
        {
            if (!username)
            {
                q.reject('Invalid username');
            }
            else
            {
                q.reject('Invalid password');
            }
        }

        return q.promise;
    };

    TNFirebaseAuth.prototype.logout = function()
    {
        var
        q = $q.defer();

        firebaseAuth.$unauth();

        firebaseAuth.$onAuth(function(authData)
        {
            if (authData)
            {
                q.reject('Failed to logout from: ', authData.uid);
            }
            else
            {
                loggedOut = true;
                q.resolve();
            }
        });

        return q.promise;
    };

    TNFirebaseAuth.prototype.usernameIsValid = function(username)
    {
        var
        q           = $q.defer(),
        isValid     = false,
        usernames   = this.properties.usernames,
        findingUser = this.findingUser;

        if (findingUser && findingUser.reject)
        {
            findingUser.reject();
        }

        angular.forEach(usernames, function(email)
        {
            if (email === username)
            {
                isValid = true;
            }
        });

        if (isValid)
        {
            q.resolve(true);
        }
        else
        {
            this.findingUser = Username.find(username).then(function(data)
            {
                if (data.uid)
                {
                    q.resolve(true);
                }
                else
                {
                    q.resolve(false);
                }
            });
        }

        return q.promise;
    };

    TNFirebaseAuth.prototype.getSession = function()
    {
        var
        q        = $q.defer(),
        authData = this.getAuth();

        if (authData)
        {
            User.find(authData.uid).then(function(userData)
            {
                if (userData.uid)
                {
                    authorization = authData;

                    User.current(userData);

                    q.resolve({auth : authData, user : userData});
                }
                else
                {
                    q.reject('Session found but is not a valid user');
                }
            });
        }
        else
        {
            q.reject('No sessions found');
        }

        return q.promise;
    };

    TNFirebaseAuth.prototype.setUserFromAuth = function(options)
    {
        var
        q           = $q.defer(),
        promiseUser = $q.defer(),
        username    = options.username,
        authData    = options.authData,
        promiseUsername,
        user;

        authorization = authData;

        User.find(authorization.uid).then(function(loggedInUser)
        {
            user = User.current(loggedInUser);

            if (user.uid)
            {
                q.resolve({auth : authData, user : loggedInUser});
            }
            else
            {
                if (!username)
                {
                    username = authorization.uid;
                }

                console.log(authorization);

                User.create({uid : authorization.uid, username : username, current : true}).then(function(createdUser)
                {
                    promiseUser.resolve();
                });

                promiseUsername = Username.create({uid : authorization.uid, username : username, current : true});

                $q.all([promiseUser.promise, promiseUsername]).then(function()
                {
                    q.resolve({auth : authData, user : loggedInUser});
                });
            }
        });

        return q.promise;
    };

    TNFirebaseAuth.prototype.createUser = function(options)
    {
        var
        q = $q.defer();

        firebaseAuth.$createUser({email : options.username, password : options.password}).then(function(userData)
        {
            q.resolve(userData);
        }).

        catch(function(error)
        {
            q.reject(error);
        });

        return q.promise;
    };

    return TNFirebaseAuth;
});
*/