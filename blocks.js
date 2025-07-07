// Define all block types here
Blockly.defineBlocksWithJsonArray([
    // Control Blocks
    {
        "type": "start",
        "message0": "Start",
        "nextStatement": null,
        "colour": 60,
        "tooltip": "Program entry point"
    },
    // Option 2: Explicit Arduino entry blocks
    {
        "type": "setup",
        "message0": "setup() %1",
        "args0": [
            { "type": "input_statement", "name": "DO" }
        ],
        "nextStatement": null,
        "colour": 60,
        "tooltip": "Arduino setup() function: runs once at startup"
    },
    {
        "type": "loop",
        "message0": "loop() %1",
        "args0": [
            { "type": "input_statement", "name": "DO" }
        ],
        "nextStatement": null,
        "colour": 60,
        "tooltip": "Arduino loop() function: runs repeatedly"
    },
    {
        "type": "wait_ms",
        "message0": "Wait %1 ms",
        "args0": [
            { "type": "field_number", "name": "DELAY", "value": 1000, "min": 0 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 60,
        "tooltip": "Wait for specified milliseconds"
    },
            {
                "type": "repeat_times",
                "message0": "Repeat %1 times",
                "args0": [
                    { "type": "field_number", "name": "TIMES", "value": 10, "min": 1 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 60,
        "tooltip": "Repeat block specified number of times"
            },
            {
                "type": "forever",
                "message0": "Forever",
                "previousStatement": null,
                "nextStatement": null,
                "colour": 60,
        "tooltip": "Repeat block forever"
            },
            {
                "type": "wait_until",
                "message0": "Wait until %1",
                "args0": [
                    { "type": "input_value", "name": "COND", "check": "Boolean" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 60,
        "tooltip": "Wait until condition is true"
            },
            // Input Blocks
            {
                "type": "read_button",
        "message0": "Read button pin %1",
                "args0": [
                    { "type": "field_number", "name": "PIN", "value": 3, "min": 0, "max": 50 }
                ],
                "output": "Boolean",
                "colour": 120,
        "tooltip": "Read digital state of button"
            },
            {
                "type": "read_pot",
        "message0": "Read potentiometer pin %1",
                "args0": [
                    { "type": "field_dropdown", "name": "PIN", "options": [["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]] }
                ],
                "output": "Number",
                "colour": 120,
        "tooltip": "Read analog value from potentiometer"
            },
            {
                "type": "read_light",
        "message0": "Read light sensor pin %1",
                "args0": [
                    { "type": "field_dropdown", "name": "PIN", "options": [["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]] }
                ],
                "output": "Number",
                "colour": 120,
        "tooltip": "Read analog value from light sensor"
            },
            {
                "type": "read_sound",
        "message0": "Read sound sensor pin %1",
                "args0": [
                    { "type": "field_dropdown", "name": "PIN", "options": [["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]] }
                ],
                "output": "Number",
                "colour": 120,
        "tooltip": "Read analog value from sound sensor"
            },
            {
                "type": "read_touch",
        "message0": "Read touch sensor pin %1",
                "args0": [
                    { "type": "field_number", "name": "PIN", "value": 2, "min": 0, "max": 50 }
                ],
                "output": "Boolean",
                "colour": 120,
        "tooltip": "Read digital state of touch sensor"
            },
            {
                "type": "ultrasonic_cm",
        "message0": "Ultrasonic distance trig %1 echo %2",
                "args0": [
                    { "type": "field_number", "name": "TRIG", "value": 7, "min": 0, "max": 50 },
                    { "type": "field_number", "name": "ECHO", "value": 8, "min": 0, "max": 50 }
                ],
                "output": "Number",
                "colour": 120,
        "tooltip": "Measure distance using ultrasonic sensor"
            },
            {
                "type": "dht11_temp",
        "message0": "DHT11 temperature pin %1",
                "args0": [
                    { "type": "field_number", "name": "PIN", "value": 5, "min": 0, "max": 50 }
                ],
                "output": "Number",
                "colour": 120,
        "tooltip": "Read temperature from DHT11 sensor"
            },
            {
                "type": "dht11_hum",
        "message0": "DHT11 humidity pin %1",
                "args0": [
                    { "type": "field_number", "name": "PIN", "value": 5, "min": 0, "max": 50 }
                ],
                "output": "Number",
                "colour": 120,
        "tooltip": "Read humidity from DHT11 sensor"
            },
            // Output Blocks
            {
                "type": "led_onoff",
        "message0": "LED pin %1 %2",
                "args0": [
                    { "type": "field_number", "name": "PIN", "value": 2, "min": 0, "max": 50 },
                    { "type": "field_dropdown", "name": "STATE", "options": [["ON","HIGH"],["OFF","LOW"]] }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 20,
        "tooltip": "Control LED on/off"
            },
            {
                "type": "blink_led",
        "message0": "Blink LED pin %1 interval %2 ms",
                "args0": [
                    { "type": "field_number", "name": "PIN", "value": 2, "min": 0, "max": 50 },
                    { "type": "field_number", "name": "INTERVAL", "value": 500, "min": 1 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 20,
        "tooltip": "Blink LED with specified interval"
            },
            {
                "type": "set_rgb",
        "message0": "Set RGB LED R:%1 G:%2 B:%3",
                "args0": [
                    { "type": "field_number", "name": "R", "value": 255, "min": 0, "max": 255 },
                    { "type": "field_number", "name": "G", "value": 0, "min": 0, "max": 255 },
                    { "type": "field_number", "name": "B", "value": 0, "min": 0, "max": 255 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 20,
        "tooltip": "Set RGB LED color"
            },
            {
                "type": "play_tone",
        "message0": "Play tone freq %1 Hz duration %2 ms pin %3",
                "args0": [
                    { "type": "field_number", "name": "FREQ", "value": 440, "min": 1 },
                    { "type": "field_number", "name": "DUR", "value": 500, "min": 1 },
                    { "type": "field_number", "name": "PIN", "value": 4, "min": 0, "max": 50 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 20,
        "tooltip": "Play tone with specified frequency and duration"
            },
            {
                "type": "beep",
        "message0": "Buzzer %1 pin %2",
                "args0": [
                    { "type": "field_dropdown", "name": "STATE", "options": [["Start","START"],["Stop","STOP"]] },
                    { "type": "field_number", "name": "PIN", "value": 4, "min": 0, "max": 50 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 20,
        "tooltip": "Control buzzer start/stop"
            },
    // Display Blocks
            {
                "type": "oled_print",
                "message0": "OLED print %1",
                "args0": [
                    { "type": "input_value", "name": "TEXT" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 260,
        "tooltip": "Print text on OLED display"
            },
            {
                "type": "oled_clear",
        "message0": "OLED clear",
                "previousStatement": null,
                "nextStatement": null,
                "colour": 260,
        "tooltip": "Clear OLED display"
            },
            {
                "type": "oled_draw_line",
        "message0": "OLED draw line (%1,%2) to (%3,%4)",
                "args0": [
                    { "type": "field_number", "name": "X1", "value": 0 },
                    { "type": "field_number", "name": "Y1", "value": 0 },
                    { "type": "field_number", "name": "X2", "value": 127 },
                    { "type": "field_number", "name": "Y2", "value": 63 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 260,
        "tooltip": "Draw line on OLED display"
            },
            {
                "type": "oled_draw_rect",
        "message0": "OLED draw rect (%1,%2) w:%3 h:%4",
                "args0": [
                    { "type": "field_number", "name": "X", "value": 0 },
                    { "type": "field_number", "name": "Y", "value": 0 },
                    { "type": "field_number", "name": "W", "value": 20 },
                    { "type": "field_number", "name": "H", "value": 10 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 260,
        "tooltip": "Draw rectangle on OLED display"
            },
            {
                "type": "oled_draw_circle",
        "message0": "OLED draw circle (%1,%2) radius %3",
                "args0": [
                    { "type": "field_number", "name": "X", "value": 64 },
                    { "type": "field_number", "name": "Y", "value": 32 },
                    { "type": "field_number", "name": "R", "value": 10 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 260,
        "tooltip": "Draw circle on OLED display"
            },
            {
                "type": "oled_show_var",
                "message0": "OLED show variable %1",
                "args0": [
                    { "type": "input_value", "name": "VAR" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 260,
        "tooltip": "Show variable value on OLED display"
            },
    // LED Matrix Blocks
            {
                "type": "matrix_set_pixel",
                "message0": "Matrix set pixel (%1,%2) %3",
                "args0": [
                    { "type": "field_number", "name": "X", "value": 0, "min": 0, "max": 7 },
                    { "type": "field_number", "name": "Y", "value": 0, "min": 0, "max": 7 },
                    { "type": "field_dropdown", "name": "STATE", "options": [["ON","ON"],["OFF","OFF"]] }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
        "tooltip": "Set pixel on LED matrix"
            },
            {
                "type": "matrix_clear",
        "message0": "Matrix clear",
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
        "tooltip": "Clear LED matrix"
            },
            {
                "type": "matrix_scroll_text",
                "message0": "Matrix scroll text %1",
                "args0": [
                    { "type": "input_value", "name": "TEXT" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
        "tooltip": "Scroll text on LED matrix"
            },
            {
                "type": "matrix_show_icon",
                "message0": "Matrix show icon %1",
                "args0": [
                    { "type": "field_dropdown", "name": "ICON", "options": [["Heart","HEART"],["Smile","SMILE"],["Arrow","ARROW"]] }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
        "tooltip": "Show icon on LED matrix"
            },
    // Actuator Blocks
            {
                "type": "servo_angle",
        "message0": "Servo pin %1 angle %2",
                "args0": [
                    { "type": "field_number", "name": "PIN", "value": 9, "min": 0, "max": 50 },
                    { "type": "field_number", "name": "ANGLE", "value": 90, "min": 0, "max": 180 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 40,
        "tooltip": "Set servo angle"
            },
            {
                "type": "motor_run",
        "message0": "Motor run pin %1 speed %2",
                "args0": [
            { "type": "field_number", "name": "PIN", "value": 10, "min": 0, "max": 50 },
            { "type": "field_number", "name": "SPEED", "value": 255, "min": 0, "max": 255 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 40,
        "tooltip": "Run motor with specified speed"
            },
            {
                "type": "motor_stop",
        "message0": "Motor stop pin %1",
                "args0": [
            { "type": "field_number", "name": "PIN", "value": 10, "min": 0, "max": 50 }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 40,
        "tooltip": "Stop motor"
            },
            {
                "type": "relay_onoff",
                "message0": "Relay pin %1 %2",
                "args0": [
            { "type": "field_number", "name": "PIN", "value": 11, "min": 0, "max": 50 },
                    { "type": "field_dropdown", "name": "STATE", "options": [["ON","HIGH"],["OFF","LOW"]] }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 40,
        "tooltip": "Control relay on/off"
    },
    // Communication Blocks
            {
                "type": "serial_print",
                "message0": "Serial print %1",
                "args0": [
                    { "type": "input_value", "name": "TEXT" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 330,
        "tooltip": "Print to serial monitor"
            },
            {
                "type": "bluetooth_send",
                "message0": "Bluetooth send %1",
                "args0": [
            { "type": "input_value", "name": "DATA" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 330,
        "tooltip": "Send data via Bluetooth"
            },
            {
                "type": "i2c_write",
        "message0": "I2C write address %1 data %2",
                "args0": [
            { "type": "field_number", "name": "ADDR", "value": 0x48, "min": 0, "max": 255 },
                    { "type": "input_value", "name": "DATA" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 330,
        "tooltip": "Write data to I2C device"
            },
            {
                "type": "spi_write",
                "message0": "SPI write data %1",
                "args0": [
                    { "type": "input_value", "name": "DATA" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 330,
        "tooltip": "Write data via SPI"
    }
]);

// --- Arduino Generators ---
Blockly.Arduino = Blockly.Arduino || {};

// Control blocks
Blockly.Arduino['start'] = function(block) {
    return ''; // Start block is just a marker
};

Blockly.Arduino['setup'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    return 'void setup() {\n' + branch + '\n}\n';
};

Blockly.Arduino['loop'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    return 'void loop() {\n' + branch + '\n}\n';
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

Blockly.Python['setup'] = function(block) {
    var branch = Blockly.Python.statementToCode(block, 'DO');
    return 'def setup():\n' + Blockly.Python.prefixLines(branch, '    ');
};

Blockly.Python['loop'] = function(block) {
    var branch = Blockly.Python.statementToCode(block, 'DO');
    return 'def loop():\n' + Blockly.Python.prefixLines(branch, '    ');
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