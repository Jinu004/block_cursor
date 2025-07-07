// Blockly code generators for STEM Blockly IDE

// --- Arduino Generators ---
Blockly.Arduino = Blockly.Arduino || {};

// Add workspaceToCode function to Arduino generator
Blockly.Arduino.workspaceToCode = function(workspace) {
    if (!workspace) return '';
    let code = '';
    const topBlocks = workspace.getTopBlocks(true);
    for (let i = 0; i < topBlocks.length; i++) {
        let block = topBlocks[i];
        while (block) {
            let line = Blockly.Arduino.blockToCode(block);
            if (Array.isArray(line)) line = line[0];
            if (line) code += line;
            block = block.getNextBlock();
        }
    }
    return code;
};

// Add helper functions for Arduino generator
Blockly.Arduino.statementToCode = function(block, name) {
    const targetBlock = block.getInputTargetBlock(name);
    if (!targetBlock) {
        return '';
    }
    return Blockly.Arduino.workspaceToCode(targetBlock.workspace);
};

Blockly.Arduino.valueToCode = function(block, name, order) {
    const targetBlock = block.getInputTargetBlock(name);
    if (!targetBlock) {
        return ['', order];
    }
    const code = Blockly.Arduino.workspaceToCode(targetBlock.workspace);
    return [code, order];
};

Blockly.Arduino.ORDER_ATOMIC = 0;
Blockly.Arduino.ORDER_NONE = 99;

// Option 1: Enhanced Start block as entry point
Blockly.Arduino['start'] = function(block) {
    // This assumes the user connects their main code to a statement input named 'DO' (if you use a statement input),
    // or as a chain of next-connected blocks (default Blockly behavior).
    // We'll collect all next-connected blocks and wrap them in loop().
    var branch = Blockly.Arduino.statementToCode(block, 'DO'); // If you use a statement input
    if (!branch) {
        // Fallback: collect next-connected blocks
        var nextBlock = block.getNextBlock();
        branch = '';
        while (nextBlock) {
            var line = Blockly.Arduino.blockToCode(nextBlock);
            if (Array.isArray(line)) line = line[0];
            if (line) branch += line;
            nextBlock = nextBlock.getNextBlock();
        }
    }
    return 'void setup() {\n  // put your setup code here\n}\n\nvoid loop() {\n' + branch + '}\n';
};

// Option 2: Explicit setup and loop blocks (add these to your block definitions and toolbox)
Blockly.Arduino['setup'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    return 'void setup() {\n' + branch + '}\n';
};

Blockly.Arduino['loop'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    return 'void loop() {\n' + branch + '}\n';
};

Blockly.Arduino['wait_ms'] = function(block) {
    var delay = block.getFieldValue('DELAY');
    return 'delay(' + delay + ');\n';
};

Blockly.Arduino['repeat_times'] = function(block) {
    var times = block.getFieldValue('TIMES');
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    return 'for (int i = 0; i < ' + times + '; i++) {\n' + branch + '}\n';
};

Blockly.Arduino['forever'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    return 'while (true) {\n' + branch + '}\n';
};

Blockly.Arduino['wait_until'] = function(block) {
    var cond = Blockly.Arduino.valueToCode(block, 'COND', Blockly.Arduino.ORDER_NONE) || 'false';
    return 'while (!(' + cond + ')) {\n  delay(10);\n}\n';
};

// Input blocks
Blockly.Arduino['read_button'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['digitalRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['read_pot'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['analogRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['read_light'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['analogRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['read_sound'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['analogRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['read_touch'] = function(block) {
  var pin = block.getFieldValue('PIN');
  return ['digitalRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['ultrasonic_cm'] = function(block) {
    var trig = block.getFieldValue('TRIG');
    var echo = block.getFieldValue('ECHO');
    return ['getDistance(' + trig + ', ' + echo + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['dht11_temp'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['getTemperature(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['dht11_hum'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return ['getHumidity(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

// Output blocks
Blockly.Arduino['led_onoff'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var state = block.getFieldValue('STATE');
    return 'digitalWrite(' + pin + ', ' + state + ');\n';
};

Blockly.Arduino['blink_led'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var interval = block.getFieldValue('INTERVAL');
    return 'digitalWrite(' + pin + ', HIGH);\ndelay(' + interval + ');\ndigitalWrite(' + pin + ', LOW);\ndelay(' + interval + ');\n';
};

Blockly.Arduino['set_rgb'] = function(block) {
    var r = block.getFieldValue('R');
    var g = block.getFieldValue('G');
    var b = block.getFieldValue('B');
    return 'analogWrite(RED_PIN, ' + r + ');\nanalogWrite(GREEN_PIN, ' + g + ');\nanalogWrite(BLUE_PIN, ' + b + ');\n';
};

Blockly.Arduino['play_tone'] = function(block) {
    var freq = block.getFieldValue('FREQ');
    var dur = block.getFieldValue('DUR');
  var pin = block.getFieldValue('PIN');
    return 'tone(' + pin + ', ' + freq + ', ' + dur + ');\n';
};

Blockly.Arduino['beep'] = function(block) {
    var state = block.getFieldValue('STATE');
  var pin = block.getFieldValue('PIN');
    if (state === 'START') {
        return 'tone(' + pin + ', 1000);\n';
    } else {
        return 'noTone(' + pin + ');\n';
    }
};

// Display blocks
Blockly.Arduino['oled_print'] = function(block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '""';
    return 'display.println(' + text + ');\ndisplay.display();\n';
};

Blockly.Arduino['oled_clear'] = function(block) {
    return 'display.clearDisplay();\ndisplay.display();\n';
};

Blockly.Arduino['oled_draw_line'] = function(block) {
    var x1 = block.getFieldValue('X1');
    var y1 = block.getFieldValue('Y1');
    var x2 = block.getFieldValue('X2');
    var y2 = block.getFieldValue('Y2');
    return 'display.drawLine(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', SSD1306_WHITE);\ndisplay.display();\n';
};

Blockly.Arduino['oled_draw_rect'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');
    var w = block.getFieldValue('W');
    var h = block.getFieldValue('H');
    return 'display.drawRect(' + x + ', ' + y + ', ' + w + ', ' + h + ', SSD1306_WHITE);\ndisplay.display();\n';
};

Blockly.Arduino['oled_draw_circle'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');
    var r = block.getFieldValue('R');
    return 'display.drawCircle(' + x + ', ' + y + ', ' + r + ', SSD1306_WHITE);\ndisplay.display();\n';
};

Blockly.Arduino['oled_show_var'] = function(block) {
    var var_code = Blockly.Arduino.valueToCode(block, 'VAR', Blockly.Arduino.ORDER_ATOMIC) || '0';
    return 'display.clearDisplay();\ndisplay.setCursor(0, 0);\ndisplay.println(' + var_code + ');\ndisplay.display();\n';
};

// LED Matrix blocks
Blockly.Arduino['matrix_set_pixel'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');
    var state = block.getFieldValue('STATE');
    return 'matrix.setPixel(' + x + ', ' + y + ', ' + (state === 'ON' ? '1' : '0') + ');\nmatrix.show();\n';
};

Blockly.Arduino['matrix_clear'] = function(block) {
    return 'matrix.clear();\nmatrix.show();\n';
};

Blockly.Arduino['matrix_scroll_text'] = function(block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '""';
    return 'matrix.scrollText(' + text + ');\n';
};

Blockly.Arduino['matrix_show_icon'] = function(block) {
    var icon = block.getFieldValue('ICON');
    return 'matrix.showIcon(' + icon + ');\n';
};

// Actuator blocks
Blockly.Arduino['servo_angle'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var angle = block.getFieldValue('ANGLE');
    return 'servo_' + pin + '.write(' + angle + ');\n';
};

Blockly.Arduino['motor_run'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var speed = block.getFieldValue('SPEED');
    return 'analogWrite(' + pin + ', ' + speed + ');\n';
};

Blockly.Arduino['motor_stop'] = function(block) {
    var pin = block.getFieldValue('PIN');
    return 'analogWrite(' + pin + ', 0);\n';
};

Blockly.Arduino['relay_onoff'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var state = block.getFieldValue('STATE');
    return 'digitalWrite(' + pin + ', ' + state + ');\n';
};

// Communication blocks
Blockly.Arduino['serial_print'] = function(block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '""';
    return 'Serial.println(' + text + ');\n';
};

Blockly.Arduino['bluetooth_send'] = function(block) {
    var data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '""';
    return 'bluetooth.println(' + data + ');\n';
};

Blockly.Arduino['i2c_write'] = function(block) {
    var addr = block.getFieldValue('ADDR');
    var data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    return 'Wire.beginTransmission(' + addr + ');\nWire.write(' + data + ');\nWire.endTransmission();\n';
};

Blockly.Arduino['spi_write'] = function(block) {
    var data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    return 'SPI.transfer(' + data + ');\n';
};

// --- MicroPython Generators ---
Blockly.Python = Blockly.Python || {};

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