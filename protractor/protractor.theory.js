global.theory =
{
    css :
    {
        iconPicker             : '.tn-icon',
        photoPicker            : '.tn-photo',
        imagePickerImage       : 'img',
        imagePickerPlaceholder : '.placeholder',
        icon                   : 'http://lorempixel.com/160/160/nature',
        photo                  : 'http://lorempixel.com/580/360/nature'
    },

    timeout : 1000,

    sleep : function(timeout)
    {
        if (!timeout)
        {
            timeout = theory.timeout;
        }

        browser.sleep(timeout);
    },

    hasClass : function (element, cls)
    {
        return element.getAttribute('class').then(function (classes)
        {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    },

    alertWait : function()
    {
        return browser.switchTo().alert().then(function()
        {
            return true;
        }, 

        function()
        {
            return false;
        });
    },

    login : function(options)
    {
        var
        mainHandle,
        popupHandle,
        handlesPromise,
        handleException,
        register = false;

        if (options)
        {
            register = options.register;
        }

//                theory.click('.button.button-block.button-positive');

        // Wait for opening login popup
        browser.driver.sleep(theory.timeout);

        handlesPromise = browser.getAllWindowHandles();

        var
        promise,
        handleException = function (error)
        {
            console.log(error);
        };

        promise = handlesPromise.then(function(handles)
        {
            theory.mainHandle = mainHandle = handles[0];
            popupHandle = handles[1];

            // switch to login popup window
            return browser.switchTo().window(popupHandle);
        }).

        then(function(handle)
        {
            browser.driver.findElement(by.id('email')).sendKeys('new_rimndhb_user@tfbnw.net');
            browser.driver.findElement(by.id('pass')).sendKeys('FireflyTest1!');

            return browser.driver.findElement(by.name('login')).click();
        }, handleException);

        if (register)
        {
            promise = promise.then(function()
            {
                // Only uncoment this if this is a new user registration
                return browser.driver.findElement(by.name('__CONFIRM__')).click();
            }, handleException);
        }

        promise.then(function()
        {
            // Switch back to first window
            return browser.switchTo().window(mainHandle);
        }, handleException);

        browser.sleep(theory.timeout);
    },

    /*
        1 - Click the menu button
        2 - Click the logout button
    */
    logout : function()
    {
        // 1 - Click the menu button
        theory.click(ion.css.menu);
        browser.sleep(theory.timeout);

        // 2 - Click the logout button
        theory.click(firefly.css.logout);
    },

    testAlertText : function(text, not)
    {
        browser.wait(theory.alertWait);

        if (not)
        {
            expect(browser.switchTo().alert().getText()).not.toMatch(text);
        }
        else
        {
            expect(browser.switchTo().alert().getText()).toMatch(text);
        }

        browser.switchTo().alert().accept();

        browser.sleep(theory.timeout);

        browser.switchTo().window(theory.mainHandle);
    },

    testCount : function(css, count, not)
    {
        if (not)
        {
            expect(element.all(by.css(css)).count()).not.toEqual(count);
        }
        else
        {
            expect(element.all(by.css(css)).count()).toEqual(count);
        }
    },

    testField : function(field)
    {
        if (field.attribute === 'text')
        {
            expect(element(by.css(field.css)).getText()).toEqual(field.value);
        }
        else if (field.attribute === 'checked')
        {
            if (field.value)
            {
                expect(element(by.css(field.css)).isSelected(field.attribute)).toBeTruthy();
            }
            else
            {
                expect(element(by.css(field.css)).isSelected(field.attribute)).not.toBeTruthy();
            }
        }
        else
        {
            expect(element(by.css(field.css)).getAttribute(field.attribute)).toEqual(field.value);
        }
    },

    testFields : function(fields)
    {
        var
        length = fields.length;

        for (var i = 0; i < length; i++)
        {
            theory.testField(fields[i]);
        }
    },

    navigate : function(nav)
    {
        var
        length,
        action;

        if (nav)
        {
            length = nav.length;

            for (var i = 0; i < length; i++)
            {
                action = nav[i];
                theory.click(action);
                theory.sleep();
            }
        }
    },

    testScreens : function(screens)
    {
        var
        length = screens.length,
        view;

        for (var i = 0; i < length; i++)
        {
            view = screens[i];

            theory.navigate(view.navigate);

            theory.testFields(view.fields);
        }
    },

    testURL : function(url, not)
    {
        if (not)
        {
            expect(browser.getLocationAbsUrl()).not.toMatch(url);
        }
        else
        {
            expect(browser.getLocationAbsUrl()).toMatch(url);
        }
    },

    editField : function(css)
    {
        element(by.css(css)).sendKeys(' EDITED');
    },

    populateField : function(css, text, keep)
    {
        if (!keep)
        {
            theory.clearField(css);
        }

        element(by.css(css)).sendKeys(text);
    },

    clearField : function(css)
    {
        element(by.css(css)).clear();
    },

    click : function(css)
    {
        element(by.css(css)).click();
    },

    clickFirst : function(css)
    {
        element.all(by.css(css)).first().click();
    },

    clickLast : function(css)
    {
        element.all(by.css(css)).last().click();
    },

    imagePickerSelectFirst : function(css)
    {
        theory.click(css);
        theory.click(ion.css.actionSheetFirstOption);
    },

    imagePickerClasses : function(options)
    {
        var
        directive = theory.css.photoPicker,
        selector  = ion.css.view,
        classes   = {};

        if (options)
        {
            if (options.icon)
            {
                directive = theory.css.iconPicker;
            }

            if (options.selector)
            {
                selector = options.selector;
            }
        }

        classes.picker            = selector       + ' ' + directive;
        classes.pickerImage       = classes.picker + ' ' + theory.css.imagePickerImage;
        classes.pickerPlaceholder = classes.picker + ' ' + theory.css.imagePickerPlaceholder;

        return classes;
    },

    imagePickerRemove : function(options)
    {
        var
        classes = theory.imagePickerClasses(options);

        theory.clickLast(classes.picker);
        theory.click(ion.css.actionSheetThirdOption);

        if (options.test)
        {
            expect(theory.hasClass(element(by.css(classes.pickerImage)),       ion.classes.hidden)).toBe(true);
            expect(theory.hasClass(element(by.css(classes.pickerPlaceholder)), ion.classes.hidden)).toBe(false);
        }
    },

    /*
        1 - Expect the image to be hidden and the placeholder to be visible
        2 - Click the image
        3 - Click the action sheet cancel button
        4 - Expect the image to be hidden and the placeholder to be visible
        5 - Click the image and select the action sheet first option
        6 - Expect the image to be visible and the placeholder to be hidden
    */
    testImagePickerDirective : function(options)
    {
        var
        classes = theory.imagePickerClasses(options);

        // 1 - Expect the image to be hidden and the placeholder to be visible
        expect(theory.hasClass(element(by.css(classes.pickerImage)),       ion.classes.hidden)).toBe(true);
        expect(theory.hasClass(element(by.css(classes.pickerPlaceholder)), ion.classes.hidden)).toBe(false);

        // 2 - Click the image
        theory.click(classes.picker);

        // 3 - Click the action sheet cancel button
        theory.click(ion.css.actionSheetCancel);

        // 4 - Expect the image to be hidden and the placeholder to be visible
        expect(theory.hasClass(element(by.css(classes.pickerImage)),       ion.classes.hidden)).toBe(true);
        expect(theory.hasClass(element(by.css(classes.pickerPlaceholder)), ion.classes.hidden)).toBe(false);

        // 5 - Click the image and select the action sheet first option
        theory.imagePickerSelectFirst(classes.picker);

        // 6 - Expect the image to be visible and the placeholder to be hidden
        expect(theory.hasClass(element(by.css(classes.pickerImage)),       ion.classes.hidden)).toBe(false);
        expect(theory.hasClass(element(by.css(classes.pickerPlaceholder)), ion.classes.hidden)).toBe(true);
    }
};