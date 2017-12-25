d3.layout.orbit = function() {
	var currentTickStep = 0;
	var orbitNodes;
	var orbitSize = [1,1];
	var nestedNodes;
	var flattenedNodes = [];
	var tickRadianStep = 0.004363323129985824;
    var orbitDispatch = d3.dispatch('tick');
    var tickInterval;
    var orbitalRings = [];
    var orbitDepthAdjust = 2.95;

	function _orbitLayout(_data) {

		return _orbitLayout;
	}

	_orbitLayout.mode = function() {
		//Atomic, Solar, other?
	}

	_orbitLayout.start = function() {
		//activate animation here
		tickInterval = setInterval(
			function() {
			currentTickStep++;
			flattenedNodes.forEach(function(_node){
				if (_node.parent) {
					_node.x = _node.parent.x + ( (_node.parent.ring / 2) * Math.sin( _node.angle + (currentTickStep * tickRadianStep)) );
					_node.y = _node.parent.y + ( (_node.parent.ring / 2) * Math.cos( _node.angle + (currentTickStep * tickRadianStep)) );
				}
			})
			orbitalRings.forEach(function(_ring) {
				_ring.x = _ring.source.x;
				_ring.y = _ring.source.y;
			})
			orbitDispatch.tick();
		}, 
		10);
	}

	_orbitLayout.stop = function() {
		//deactivate animation here
		clearInterval(tickInterval);
	}

	_orbitLayout.speed = function(_degrees) {
		if (!arguments.length) return tickRadianStep / (Math.PI / 360);
		tickRadianStep = tickRadianStep = _degrees * (Math.PI / 360);
		return this;
	}

	_orbitLayout.size = function(_value) {
		if (!arguments.length) return orbitSize;
		orbitSize = _value;
		return this;
		//change size here
	}

	_orbitLayout.orbitSize = function(_value) {
		//change ring size reduction (make that into dynamic function)
		if (!arguments.length) return orbitDepthAdjust;
		orbitDepthAdjust = _value;
		return this
	}

	_orbitLayout.orbitalRings = function() {
		//return an array of data corresponding to orbital rings
		if (!arguments.length) return orbitalRings;
		return this;
	}

	_orbitLayout.nodes = function(_data) {
    	if (!arguments.length) return flattenedNodes;
    	nestedNodes = _data;
    	calculateNodes();
		return this;
	}

    d3.rebind(_orbitLayout, orbitDispatch, "on");

	return _orbitLayout;
	function calculateNodes() {
		var _data = nestedNodes; 
	//If you have an array of elements, then create a root node (center)
		//In the future, maybe make a binary star kind of thing?
		if (!_data.values) {
			orbitNodes = {key: "root", values: _data}
			orbitNodes.values.forEach(function (_node) {
				_node.parent = orbitNodes;
			})
		}
		//otherwise assume it is an object with a root node
		else {
			orbitNodes = _data;
		}
			orbitNodes.x = orbitSize[0] / 2;
			orbitNodes.y = orbitSize[1] / 2;
			orbitNodes.deltaX = function(_x) {return _x}
			orbitNodes.deltaY = function(_y) {return _y}
			orbitNodes.ring = orbitSize[0] / 2;
			orbitNodes.depth = 0;

			flattenedNodes.push(orbitNodes);

			traverseNestedData(orbitNodes)

		function traverseNestedData(_node) {
			if(_node.values) {
				var thisPie = d3.layout.pie().value(function() {return 1});
				var piedValues = thisPie(_node.values);

				orbitalRings.push({source: _node, x: _node.x, y: _node.y, r: _node.ring / 2});

				for (var x = 0; x<_node.values.length;x++) {

					_node.values[x].angle = piedValues[x].endAngle;
					_node.values[x].parent = _node;
					_node.values[x].depth = _node.depth + 1;

					_node.values[x].x = _node.values[x].parent.x + ( (_node.values[x].parent.ring / 2) * Math.sin( _node.values[x].angle ) );
					_node.values[x].y = _node.values[x].parent.y + ( (_node.values[x].parent.ring / 2) * Math.cos( _node.values[x].angle ) );

					_node.values[x].deltaX = function(_x) {return _x}
					_node.values[x].deltaY = function(_y) {return _y}
					_node.values[x].ring = _node.values[x].parent.ring / orbitDepthAdjust;
					flattenedNodes.push(_node.values[x]);
					traverseNestedData(_node.values[x]);
				}
			}
		}
	}

}