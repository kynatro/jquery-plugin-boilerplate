/*!
jQuery Plugin BoilerPlate

Copyright (c) 2013 Dave Shepard (http://kynatro.com/)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. 
*/

var BoilerPlate = function( el, params ) {
    // Cached elements
    this.elements = {};
    
    // Class namespace
    this.namespace = "boilerplate";
    
    this.options = {
        method: "css"
    };
    
    // Selectors for elements used by this Class instance
    this.selectors = {
        body: 'body',
        window: window
    };
    
    this.initialize( el, params );
};
( function( $, window, undefined ) {
    /**
     * Bind all events related to this BoilerPlate
     */
    BoilerPlate.prototype._bindEvents = function() {
        var self = this;
        
        // Event binding for interaction
    };

    /**
     * Bind third-party vendor interfaces such as jQuery UI interactions
     */
    BoilerPlate.prototype._bindInteraces = function() {
        // Vendor interface binding commands
    };

    /**
     * Build elements and structures related to this BoilerPlate
     */
    BoilerPlate.prototype._build = function() {
        // JavaScript to build additional elements, add classes, etc. as needed
    };

    
    /**
     * Get jQuery extended elements
     * 
     * Iterates through an Object of selectors and retrieves the jQuery
     * extended objects of those selectors. Returns an Object of those
     * jQuery extended objects for caching.
     * 
     * @param {Object} selectors Object of selectors to retrieve and cache up to two levels deep
     * @param {mixed} context jQuery extended Object, selector or DOM element to use as a context
     * 
     * @return {Object} Object of jQuery extended elements
     */
    BoilerPlate._getElements = function( selectors, context ) {
        var elements = {};
        var self = this;
        var $context = $( context || 'html' );
        
        $.each( selectors, function( key, value ) {
            if( $.isPlainObject( value ) ) {
                elements[key] = elements[key] || {};
                $.each( value, function( key2, value2 ) {
                    elements[key][key2] = $( value2, $context );
                } );
            } else {
                elements[key] = $( value, $context );
            }
        } );
        
        return elements;
    };

    /**
     * Method for doing actions passed to an instantiated slider
     * 
     * Takes multiple arguments:
     * 
     * @param {String} action The action to run
     * @param {mixed} args Optional arguments which may or may not be required by a method
     */
    BoilerPlate.prototype._run = function() {
        var arguments_array = [];
        for( var i = 0; i < arguments.length; i++ ) {
            arguments_array.push( arguments[i] );
        }
        
        var action = arguments_array[0];
        var args = arguments_array.length > 1 ? arguments_array.slice( 1 ) : [];
        
        if( typeof( this[action] ) == 'function' ) {
            // Execute and return the function's response
            return this[action].apply( this, args );
        } else if( typeof( this[action] ) != 'undefined' ) {
            // Set properties
            if( args.length > 0 ) this[action] = args[0];
            
            // Return property value
            return this[action];
        }
    };

    BoilerPlate.prototype.initialize = function( el, options ) {
        // Merge options for this instance with defaults
        this.options = $.extend( this.options, arguments[1][0] || {}, $( el ).data() );
        
        // Cache elements used by this instance
        this.elements = this._getElements( this.selectors );
        
        // Build elements
        this._build();

        // Bind interfaces (ex. jQuery UI interaction binding)
        this._bindInteraces();
        
        // Bind events
        this._bindEvents();
    };

    /**
     * Set or get an option value
     * 
     * Sets the requested instance's option to a particular value. If no value is
     * passed it just returns the current option's value. Always returns the set
     * value of the requested option.
     * 
     * @param string key The option key to get or set
     * @param mixed val Optional value to set the option to
     * 
     * @return mixed
     */
    BoilerPlate.prototype.option = function( key, val ) {
        if( val != undefined )
            this.options[key] = val;
        
        return this.options[key];
    };
    
    $.extend( $.fn, {
        boilerplate: function(){
            var options = action = arguments;
            var _return = this;
            
            this.each( function( ind ) {
                // Look up if an instance already exists
                var _BoilerPlate = $.data( this, 'BoilerPlate' );
                
                // Else create one and store it
                if( !_BoilerPlate ) {
                    _BoilerPlate = new BoilerPlate( this, options );
                    $.data( this, 'BoilerPlate', _BoilerPlate );
                }
                
                // Act upon it
                if( action.length > 0 ) {
                    var _do = _BoilerPlate._run.apply( _BoilerPlate, action );
                    if( typeof( _do ) != 'undefined' ) {
                        _return = _do;
                    }
                }
            } );
            
            return _return;
        }
    });
} )( jQuery, window, null );
