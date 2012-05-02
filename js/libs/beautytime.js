var BeautyTime = (function () {
    var _ = function () {};
    // Internaly property
    var _internal = {};
    // Now get Date Object
    _internal['now'] = new Date();
    // Get method for date objects
    _internal['get'] = function ( methodName ) {
        // Control return of the function
        var output = false;
        // Deep
        var deep = 0;
        // Available methods
        var availableMethods = {
            'hours': 'getHours',
            'minutes': 'getMinutes',
            'seconds': 'getSeconds',
            'milliseconds': 'getMilliseconds',
            'year': 'getFullYear',
            'day': 'getDate',
            'month': 'getMonth',
            'weekDay': 'getDay',
        };

        if ( methodName !== undefined ) {
            for ( var method in availableMethods ) {
                if ( methodName === method && deep === 0 ) {
                    output = _internal.now[ availableMethods[ method ] ]();   
                    deep += 1;
                }
            }
        }

        return output;
    };

    // Default set up
    _internal.time = {
        format: '%Y%M%D%h%m%s',
    };

    // Internal time
    _.prototype.time = _internal.time;

    // get time
    _.prototype.now = function () {
        var output = '';
        var self = this;
        var timeFormat = self.time.format.replace(/\s/gi, '').split('%');
        var acceptList = {
            'h': 'hours',
            'm': 'minutes',
            's': 'seconds',
            'ms': 'milliseconds',
            'Y': 'year',
            'M': 'month',
            'D': 'day',
            'W': 'weekDay',
        };

        for ( var tfPointer = 0, tfLen = timeFormat.length; tfPointer < tfLen; tfPointer += 1 ) {
            for ( var methodPointer in acceptList ) {
                if ( timeFormat[ tfPointer ] === methodPointer ) {
                    output += _internal.get( acceptList[ methodPointer ] ); 
                }
            }
        }
        
        return output; 
    };

    // BeautyTime namespace
    return new _();
});