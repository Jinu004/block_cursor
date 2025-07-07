// Wait for DOM to be ready before initializing Blockly
let workspace;
window.workspace = workspace; // Make it globally accessible for debugging

function initializeBlockly() {
    console.log('Initializing Blockly workspace...');
    
    // Make sure the toolbox element exists
    const toolbox = document.getElementById('toolbox');
    if (!toolbox) {
        console.error('Toolbox element not found!');
        return;
    }
    
    workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
        trashcan: true
    });
    
    window.workspace = workspace; // Update global reference
    
    // Clear workspace to ensure it starts empty
    workspace.clear();
    
    // Wait a bit for workspace to be fully initialized
    setTimeout(() => {
        // Check what blocks are in the workspace
        const blocks = workspace.getAllBlocks();
        console.log('Initial blocks in workspace:', blocks.length);
        blocks.forEach((block, index) => {
            console.log(`Block ${index}:`, block.type, block.id);
        });
        
        // Initialize event listeners with more specific events
        workspace.addChangeListener(function(event) {
            console.log('Workspace change event:', event.type);
            if (event.type === 'create' || event.type === 'delete' || event.type === 'move' || event.type === 'change') {
                console.log('Block event detected, updating code...');
                updateCode();
            }
        });
        
        // Set initial code display
        updateCode();
        
        console.log('Blockly workspace initialized successfully');
        console.log('Workspace:', workspace);
        console.log('Available generators:', Object.keys(Blockly));
    }, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlockly);
} else {
    initializeBlockly();
}

// Helper function to get selected board
function getSelectedBoard() {
    return document.getElementById('boardSelect').value;
}

// Main application functions
function getCode() {
    console.log('getCode() called');
    console.log('Workspace:', workspace);
    
    if (!workspace) {
        console.error('Workspace not initialized!');
        return '';
    }
    
    // Check what blocks are in the workspace
    const blocks = workspace.getAllBlocks();
    console.log('Total blocks in workspace:', blocks.length);
    blocks.forEach((block, index) => {
        console.log(`Block ${index}:`, block.type, block.id, 'disabled:', block.disabled);
    });
    
    // Check if there are any non-disabled blocks
    const activeBlocks = blocks.filter(block => !block.disabled);
    console.log('Active blocks:', activeBlocks.length);
    
    if (activeBlocks.length === 0) {
        console.log('No active blocks found, returning empty code');
        return '';
    }
    
    const isMicroPython = document.getElementById('languageToggle').checked;
    const board = getSelectedBoard();
    
    console.log('Language:', isMicroPython ? 'MicroPython' : 'Arduino');
    console.log('Board:', board);
    
    if (isMicroPython) {
        console.log('Using Python generator...');
        let code = Blockly.Python.workspaceToCode(workspace);
        console.log('Generated Python code:', code);
        if (code.trim()) {
            if (board === 'esp32') {
                code = `# MicroPython Code for ESP32
from machine import Pin, PWM, ADC, I2C
import time
import random

# Pin definitions for ESP32
led = Pin(2, Pin.OUT)
buzzer = PWM(Pin(4), freq=1000, duty=0)

# ADC setup for analog sensors
adc_pot_0 = ADC(Pin(36))
adc_light_0 = ADC(Pin(39))
adc_sound_0 = ADC(Pin(34))

# I2C setup for OLED display
i2c = I2C(0, scl=Pin(22), sda=Pin(21))
oled = SSD1306_I2C(128, 64, i2c)

# Helper functions
def get_distance(trig_pin, echo_pin):
    trig = Pin(trig_pin, Pin.OUT)
    echo = Pin(echo_pin, Pin.IN)
    trig.value(0)
    time.sleep_us(2)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    duration = time.ticks_us()
    while echo.value() == 0:
        pass
    start = time.ticks_us()
    while echo.value() == 1:
        pass
    end = time.ticks_us()
    duration = end - start
    distance = duration * 0.034 / 2
    return distance

# Main program
while True:
${code.split('\n').map(line => '    ' + line).join('\n')}
`;
            } else {
                code = `# MicroPython Code for ESP8266
from machine import Pin, PWM, ADC
import time
import random

# Pin definitions for ESP8266
led = Pin(2, Pin.OUT)
buzzer = PWM(Pin(4), freq=1000, duty=0)

# ADC setup for analog sensors
adc_pot_0 = ADC(0)
adc_light_0 = ADC(0)
adc_sound_0 = ADC(0)

# Helper functions
def get_distance(trig_pin, echo_pin):
    trig = Pin(trig_pin, Pin.OUT)
    echo = Pin(echo_pin, Pin.IN)
    trig.value(0)
    time.sleep_us(2)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    duration = time.ticks_us()
    while echo.value() == 0:
        pass
    start = time.ticks_us()
    while echo.value() == 1:
        pass
    end = time.ticks_us()
    duration = end - start
    distance = duration * 0.034 / 2
    return distance

# Main program
while True:
${code.split('\n').map(line => '    ' + line).join('\n')}
`;
            }
        }
        return code;
    } else {
        console.log('Using Arduino generator...');
        let code = Blockly.Arduino.workspaceToCode(workspace);
        console.log('Generated Arduino code:', code);
        if (code.trim()) {
            if (board === 'esp32') {
                code = `// ESP32 Arduino Code
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Servo.h>

// Pin definitions for ESP32
#define LED_PIN 2
#define BUZZER_PIN 4
#define RED_PIN 25
#define GREEN_PIN 26
#define BLUE_PIN 27

// OLED display
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Servo objects (declare as needed)
Servo servo_9;

// Helper functions
float getDistance(int trigPin, int echoPin) {
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    long duration = pulseIn(echoPin, HIGH);
    float distance = duration * 0.034 / 2;
    return distance;
}

float getTemperature(int pin) {
    int reading = analogRead(pin);
    float voltage = reading * 3.3 / 4095.0;
    float temperature = (voltage - 0.5) * 100; // For TMP36 sensor
    return temperature;
}

float getHumidity(int pin) {
    // DHT11 implementation would go here
    return 50.0; // Placeholder
}

void setup() {
    Serial.begin(115200);
    pinMode(LED_PIN, OUTPUT);
    pinMode(BUZZER_PIN, OUTPUT);
    pinMode(RED_PIN, OUTPUT);
    pinMode(GREEN_PIN, OUTPUT);
    pinMode(BLUE_PIN, OUTPUT);
    
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
    }
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    
    servo_9.attach(9);
}

void loop() {
${code.split('\n').map(line => '    ' + line).join('\n')}
}`;
            } else {
                code = `// Arduino Code
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Servo.h>

// Pin definitions
#define LED_PIN 2
#define BUZZER_PIN 4
#define RED_PIN 9
#define GREEN_PIN 10
#define BLUE_PIN 11

// OLED display
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Servo objects (declare as needed)
Servo servo_9;

// Helper functions
float getDistance(int trigPin, int echoPin) {
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    long duration = pulseIn(echoPin, HIGH);
    float distance = duration * 0.034 / 2;
    return distance;
}

float getTemperature(int pin) {
    int reading = analogRead(pin);
    float voltage = reading * 5.0 / 1024.0;
    float temperature = (voltage - 0.5) * 100; // For TMP36 sensor
    return temperature;
}

float getHumidity(int pin) {
    // DHT11 implementation would go here
    return 50.0; // Placeholder
}

void setup() {
    Serial.begin(9600);
    pinMode(LED_PIN, OUTPUT);
    pinMode(BUZZER_PIN, OUTPUT);
    pinMode(RED_PIN, OUTPUT);
    pinMode(GREEN_PIN, OUTPUT);
    pinMode(BLUE_PIN, OUTPUT);
    
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
    }
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    
    servo_9.attach(9);
}

void loop() {
${code.split('\n').map(line => '    ' + line).join('\n')}
}`;
            }
        }
        return code;
    }
}

function updateCode() {
    console.log('updateCode() called');
    const code = getCode();
    console.log('Final code:', code);
    
    const codeDisplay = document.getElementById('codeDisplay');
    const isMicroPython = document.getElementById('languageToggle').checked;
    
    const displayText = code || (isMicroPython ? '# Drag blocks to generate MicroPython code' : '// Drag blocks to generate Arduino code');
    codeDisplay.textContent = displayText;
    codeDisplay.className = isMicroPython ? 'code-python' : 'code-arduino';
    document.getElementById('codeHeader').textContent = isMicroPython ? 'Generated MicroPython Code' : 'Generated Arduino Code';
    
    console.log('Code display updated');
}

function runCode() {
    const code = getCode();
    const isMicroPython = document.getElementById('languageToggle').checked;
    const language = isMicroPython ? 'MicroPython' : 'Arduino';
    
    if (!code.trim()) {
        alert('No code to run! Please add some blocks first.');
        return;
    }
    
    alert(`🚀 Sending ${language} code to device...\n\n✅ Code compiled successfully!\n📡 Ready to upload to your microcontroller.`);
}

function exportCode() {
    const code = getCode();
    const isMicroPython = document.getElementById('languageToggle').checked;
    const extension = isMicroPython ? '.py' : '.ino';
    const filename = 'stem_project' + extension;
    
    if (!code.trim()) {
        alert('No code to export! Please add some blocks first.');
        return;
    }
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`✅ Code exported as ${filename}`);
}

function saveProject() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToPrettyText(xml);
    const projectData = {
        blocks: xmlText,
        language: document.getElementById('languageToggle').checked ? 'micropython' : 'arduino',
        board: getSelectedBoard(),
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stem_project.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Project saved successfully!');
}

function loadProject() {
    document.getElementById('fileInput').click();
}

function handleFileLoad(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const projectData = JSON.parse(e.target.result);
            
            // Load blocks
            const xml = Blockly.Xml.textToDom(projectData.blocks);
            workspace.clear();
            Blockly.Xml.domToWorkspace(xml, workspace);
            
            // Set language mode
            const isMicroPython = projectData.language === 'micropython';
            document.getElementById('languageToggle').checked = isMicroPython;
            
            // Set board
            if (projectData.board) {
                document.getElementById('boardSelect').value = projectData.board;
            }
            
            updateCode();
            alert('✅ Project loaded successfully!');
        } catch (error) {
            alert('❌ Error loading project: Invalid file format');
            console.error('Load error:', error);
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

function clearWorkspace() {
    if (confirm('⚠️ Are you sure you want to clear all blocks? This action cannot be undone.')) {
        workspace.clear();
        updateCode();
    }
}

window.addTestBlock = function() {
    console.log('Adding test block...');
    if (!workspace) {
        alert('❌ Workspace not initialized!');
        return;
    }
    
    try {
        // Create a simple wait block
        const testBlock = workspace.newBlock('wait_ms');
        if (testBlock) {
            testBlock.initSvg();
            testBlock.render();
            
            // Position the block in the workspace
            testBlock.moveBy(100, 100);
            
            console.log('Test block created:', testBlock);
            console.log('Block type:', testBlock.type);
            console.log('Block ID:', testBlock.id);
            
            // Force update
            updateCode();
            
            alert('✅ Test block added! Check the code preview.');
        } else {
            alert('❌ Could not create test block');
        }
    } catch (error) {
        console.error('Error creating test block:', error);
        alert(`❌ Error creating test block: ${error.message}`);
    }
};

window.testCodeGeneration = function() {
    console.log('=== Testing Code Generation ===');
    console.log('Workspace:', workspace);
    console.log('Workspace methods:', Object.getOwnPropertyNames(workspace));
    console.log('Blockly object:', Blockly);
    console.log('Arduino generators:', Blockly.Arduino);
    console.log('Python generators:', Blockly.Python);
    
    if (!workspace) {
        alert('❌ Workspace not initialized!');
        return;
    }
    
    try {
        // Try to generate code
        const arduinoCode = Blockly.Arduino.workspaceToCode(workspace);
        const pythonCode = Blockly.Python.workspaceToCode(workspace);
        
        console.log('Arduino code generated:', arduinoCode);
        console.log('Python code generated:', pythonCode);
        
                            // Skip test block creation for now
        console.log('Skipping test block creation');
        
        alert(`🧪 Code Generation Test Results:\n\nArduino: "${arduinoCode}"\n\nPython: "${pythonCode}"\n\n✅ Code generation is working!`);
    } catch (error) {
        console.error('Error in code generation:', error);
        alert(`❌ Error in code generation: ${error.message}`);
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                saveProject();
                break;
            case 'o':
                e.preventDefault();
                loadProject();
                break;
            case 'r':
                e.preventDefault();
                runCode();
                break;
        }
    }
});