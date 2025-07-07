// MicroPython code generators
Blockly.Python = Blockly.Python || {};

// Add workspaceToCode function to Python generator
Blockly.Python.workspaceToCode = function(workspace) {
    if (!workspace) return '';
    let code = '';
    const topBlocks = workspace.getTopBlocks(true);
    for (let i = 0; i < topBlocks.length; i++) {
        let block = topBlocks[i];
        while (block) {
            let line = Blockly.Python.blockToCode(block);
            if (Array.isArray(line)) line = line[0];
            if (line) code += line;
            block = block.getNextBlock();
        }
    }
    return code;
};

// Add helper functions for Python generator
Blockly.Python.statementToCode = function(block, name) {
    const targetBlock = block.getInputTargetBlock(name);
    if (!targetBlock) {
        return '';
    }
    return Blockly.Python.workspaceToCode(targetBlock.workspace);
};

Blockly.Python.valueToCode = function(block, name, order) {
    const targetBlock = block.getInputTargetBlock(name);
    if (!targetBlock) {
        return ['', order];
    }
    const code = Blockly.Python.workspaceToCode(targetBlock.workspace);
    return [code, order];
};

Blockly.Python.prefixLines = function(text, prefix) {
    return text.split('\n').map(line => prefix + line).join('\n');
};

Blockly.Python.ORDER_ATOMIC = 0;
Blockly.Python.ORDER_NONE = 99;

// Control blocks
Blockly.Python['start'] = function(block) {
    return ''; // Start block is just a marker
};

Blockly.Python['wait_ms'] = function(block) {
    var delay = block.getFieldValue('DELAY');
    return 'time.sleep_ms(' + delay + ')\n';
};

Blockly.Python['repeat_times'] = function(block) {
    var times = block.getFieldValue('TIMES');
    var branch = Blockly.Python.statementToCode(block, 'DO');
    return 'for _ in range(' + times + '):\n' + Blockly.Python.prefixLines(branch, '    ');
};

Blockly.Python['forever'] = function(block) {
    var branch = Blockly.Python.statementToCode(block, 'DO');
    return 'while True:\n' + Blockly.Python.prefixLines(branch, '    ');
};

Blockly.Python['wait_until'] = function(block) {
    var cond = Blockly.Python.valueToCode(block, 'COND', Blockly.Python.ORDER_NONE) || 'False';
    return 'while not (' + cond + '):\n    time.sleep_ms(10)\n';
};

// Input blocks
Blockly.Python['read_button'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['Pin(' + pin + ', Pin.IN).value()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['read_pot'] = function(block) {
    var pin = block.getFieldValue('PIN').replace('A', '');
    return ['adc_pot_' + pin + '.read()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['read_light'] = function(block) {
    var pin = block.getFieldValue('PIN').replace('A', '');
    return ['adc_light_' + pin + '.read()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['read_sound'] = function(block) {
    var pin = block.getFieldValue('PIN').replace('A', '');
    return ['adc_sound_' + pin + '.read()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['read_touch'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['Pin(' + pin + ', Pin.IN).value()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ultrasonic_cm'] = function(block) {
    var trig = block.getFieldValue('TRIG');
    var echo = block.getFieldValue('ECHO');
    return ['get_distance(' + trig + ', ' + echo + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dht11_temp'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['dht.temperature()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dht11_hum'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['dht.humidity()', Blockly.Python.ORDER_ATOMIC];
};

// Output blocks
Blockly.Python['led_onoff'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var state = block.getFieldValue('STATE') === 'HIGH' ? '1' : '0';
    return 'Pin(' + pin + ', Pin.OUT).value(' + state + ')\n';
};

Blockly.Python['blink_led'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var interval = block.getFieldValue('INTERVAL');
    return 'led = Pin(' + pin + ', Pin.OUT)\nled.value(1)\ntime.sleep_ms(' + interval + ')\nled.value(0)\ntime.sleep_ms(' + interval + ')\n';
};

Blockly.Python['set_rgb'] = function(block) {
    var r = block.getFieldValue('R');
    var g = block.getFieldValue('G');
    var b = block.getFieldValue('B');
    return 'pwm_r.duty(' + r + ')\npwm_g.duty(' + g + ')\npwm_b.duty(' + b + ')\n';
};

Blockly.Python['play_tone'] = function(block) {
    var freq = block.getFieldValue('FREQ');
    var dur = block.getFieldValue('DUR');
    var pin = block.getFieldValue('PIN');
    return 'buzzer = PWM(Pin(' + pin + '), freq=' + freq + ', duty=512)\ntime.sleep_ms(' + dur + ')\nbuzzer.deinit()\n';
};

Blockly.Python['beep'] = function(block) {
    var state = block.getFieldValue('STATE');
    var pin = block.getFieldValue('PIN');
    if (state === 'START') {
        return 'buzzer = PWM(Pin(' + pin + '), freq=1000, duty=512)\n';
    } else {
        return 'buzzer.deinit()\n';
    }
};

// Display blocks
Blockly.Python['oled_print'] = function(block) {
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
    return 'oled.fill(0)\noled.text(' + text + ', 0, 0)\noled.show()\n';
};

Blockly.Python['oled_clear'] = function(block) {
    return 'oled.fill(0)\noled.show()\n';
};

Blockly.Python['oled_draw_line'] = function(block) {
    var x1 = block.getFieldValue('X1');
    var y1 = block.getFieldValue('Y1');
    var x2 = block.getFieldValue('X2');
    var y2 = block.getFieldValue('Y2');
    return 'oled.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', 1)\noled.show()\n';
};

Blockly.Python['oled_draw_rect'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');
    var w = block.getFieldValue('W');
    var h = block.getFieldValue('H');
    return 'oled.rect(' + x + ', ' + y + ', ' + w + ', ' + h + ', 1)\noled.show()\n';
};

Blockly.Python['oled_draw_circle'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');
    var r = block.getFieldValue('R');
    return 'oled.circle(' + x + ', ' + y + ', ' + r + ', 1)\noled.show()\n';
};

Blockly.Python['oled_show_var'] = function(block) {
    var var_code = Blockly.Python.valueToCode(block, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0';
    return 'oled.fill(0)\noled.text(str(' + var_code + '), 0, 0)\noled.show()\n';
};

// LED Matrix blocks
Blockly.Python['matrix_set_pixel'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');
    var state = block.getFieldValue('STATE');
    return 'matrix.pixel(' + x + ', ' + y + ', ' + (state === 'ON' ? '1' : '0') + ')\nmatrix.show()\n';
};

Blockly.Python['matrix_clear'] = function(block) {
    return 'matrix.fill(0)\nmatrix.show()\n';
};

Blockly.Python['matrix_scroll_text'] = function(block) {
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
    return '# Scroll text: ' + text + '\n';
};

Blockly.Python['matrix_show_icon'] = function(block) {
    var icon = block.getFieldValue('ICON');
    return '# Show icon: ' + icon + '\n';
};

// Actuator blocks
Blockly.Python['servo_angle'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var angle = block.getFieldValue('ANGLE');
    var duty = Math.round((angle / 180) * 77 + 40);
    return 'servo_' + pin + '.duty(' + duty + ')  # ' + angle + ' degrees\n';
};

Blockly.Python['motor_run'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var speed = block.getFieldValue('SPEED');
    return 'motor_' + pin + '.speed(' + speed + ')\n';
};

Blockly.Python['motor_stop'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return 'motor_' + pin + '.speed(0)\n';
};

Blockly.Python['relay_onoff'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var state = block.getFieldValue('STATE') === 'HIGH' ? '1' : '0';
    return 'Pin(' + pin + ', Pin.OUT).value(' + state + ')\n';
};

// Communication blocks
Blockly.Python['serial_print'] = function(block) {
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
    return 'print(' + text + ')\n';
};

Blockly.Python['bluetooth_send'] = function(block) {
    var data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || '""';
    return 'bluetooth.write(str(' + data + '))\n';
};

Blockly.Python['i2c_write'] = function(block) {
    var addr = block.getFieldValue('ADDR');
    var data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || '0';
    return 'i2c.writeto(' + addr + ', bytes([' + data + ']))\n';
};

Blockly.Python['spi_write'] = function(block) {
    var data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || '0';
    return 'spi.write(bytes([' + data + ']))\n';
};