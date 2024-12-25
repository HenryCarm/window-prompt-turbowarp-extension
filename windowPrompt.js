//Credit me "HenryCarm" if your atleast gonna use the code or got help from the comments (ps. the comments were hell to type ;-;)

class WindowPrompts {
  constructor() {
    // Initialize the choice variable to store the user's choice
    this.choice = '';
    this.tempChoice = ''; // Temporary variable to hold the choice
    this.choiceSet = false; // Flag to ensure the choice is only set once
    // Create the prompt elements when the class is instantiated
    this._createPrompt();
  }

  // Define the information for the extension
  getInfo() {
    return {
      id: 'windowprompts',
      name: 'Window Prompts',
      color1: '#008B8B', // Set the primary color (dark cyan)
      color2: '#007373', // Set the secondary color (slightly darker cyan)
      blocks: [
        {
          opcode: 'showCustomPrompt',
          blockType: Scratch.BlockType.COMMAND,
          text: 'show prompt message [MESSAGE] with options [OPTION1] and [OPTION2] and [OPTION3]',
          arguments: {
            MESSAGE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'How are you feeling?' // Default message text
            },
            OPTION1: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Good' // Default option 1 text
            },
            OPTION2: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Bad' // Default option 2 text
            },
            OPTION3: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Meh' // Default option 3 text
            }
          }
        },
        {
          opcode: 'showYesNoPrompt',
          blockType: Scratch.BlockType.COMMAND,
          text: 'show Yes/No prompt with message [MESSAGE]',
          arguments: {
            MESSAGE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Do you want to continue?' // Default message for Yes/No prompt
            }
          }
        },
        {
          opcode: 'showWindowsPrompt',
          blockType: Scratch.BlockType.COMMAND,
          text: 'windows prompt [MESSAGE] with [OPTIONS]',
          arguments: {
            MESSAGE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'HenryCarmichael did good, right?'
            },
            OPTIONS: {
              type: Scratch.ArgumentType.STRING,
              menu: 'optionsMenu',
              defaultValue: 'Ok and Cancel'
            }
          }
        },
        {
          opcode: 'userChoice',
          blockType: Scratch.BlockType.REPORTER,
          text: 'user choice' // Reporter block to return the user's choice
        }
      ],
      menus: {
        optionsMenu: {
          acceptReporters: true,
          items: ['Ok and Cancel', 'Ok', 'Text Field']
        }
      }
    };
  }

  // Create the prompt elements and set up the initial UI
  _createPrompt() {
    // Create an overlay element to cover the entire screen
    const overlay = document.createElement('div');
    overlay.id = 'promptOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'none'; // Initially hide the overlay
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999'; // Ensure the overlay appears on top of other elements

    // Create a box element to contain the prompt message and buttons
    const box = document.createElement('div');
    box.id = 'promptBox';
    box.style.backgroundColor = '#fff';
    box.style.padding = '20px';
    box.style.borderRadius = '10px';
    box.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
    box.style.position = 'absolute'; // Use absolute positioning for draggable functionality
    box.style.cursor = 'move';

    // Create a div to display the prompt message
    const messageDiv = document.createElement('div');
    messageDiv.id = 'promptMessage';
    messageDiv.style.color = '#000'; // Set text color to black for visibility
    box.appendChild(messageDiv);

    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '10px';

    // Store buttons in an array for easier management
    this.buttons = [];

    // Function to create a button with a given index and text
    const createButton = (index, text) => {
      const button = document.createElement('button');
      button.textContent = text; // Set the button text
      button.style.margin = '5px';
      button.addEventListener('click', () => {
        this.tempChoice = index + 1; // Return 1, 2, or 3 based on button index
        this.choiceSet = true; // Mark the choice as set
        overlay.style.display = 'none'; // Hide the overlay when a button is clicked
      });
      this.buttons.push(button); // Add the button to the buttons array
      return button;
    };

    // Create three buttons and append them to the button container
    buttonContainer.appendChild(createButton(0, 'Option1'));
    buttonContainer.appendChild(createButton(1, 'Option2'));
    buttonContainer.appendChild(createButton(2, 'Option3'));

    box.appendChild(buttonContainer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Make the box draggable
    let isDragging = false;
    let offsetX, offsetY;

    box.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = box.getBoundingClientRect();
      offsetX = e.clientX - rect.left; // Calculate the offset of the mouse from the box's left edge
      offsetY = e.clientY - rect.top; // Calculate the offset of the mouse from the box's top edge
      box.style.cursor = 'grabbing'; // Change the cursor to a grabbing hand
    });

    document.addEventListener('mouseup', () => {
      isDragging = false; // Stop dragging when the mouse button is released
      box.style.cursor = 'move'; // Change the cursor back to the move cursor
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        box.style.left = `${e.clientX - offsetX}px`; // Update the box's left position based on the mouse movement
        box.style.top = `${e.clientY - offsetY}px`; // Update the box's top position based on the mouse movement
      }
    });
  }

  // Function to show the custom prompt with three options
  showCustomPrompt({ MESSAGE, OPTION1, OPTION2, OPTION3 }) {
    this.tempChoice = ''; // Reset the temporary choice variable
    this.choiceSet = false; // Reset the flag before showing the prompt
    const overlay = document.getElementById('promptOverlay');
    document.getElementById('promptMessage').textContent = MESSAGE; // Set the prompt message text

    // Update the button texts with the provided options
    this.buttons[0].textContent = OPTION1;
    this.buttons[1].textContent = OPTION2;
    this.buttons[2].textContent = OPTION3;

    this.buttons[2].style.display = 'inline-block'; // Ensure the third button is visible

    overlay.style.display = 'flex'; // Show the overlay
  }

  // Function to show a Yes/No prompt
  showYesNoPrompt({ MESSAGE }) {
    this.tempChoice = ''; // Reset the temporary choice variable
    this.choiceSet = false; // Reset the flag before showing the prompt
    const overlay = document.getElementById('promptOverlay');
    document.getElementById('promptMessage').textContent = MESSAGE; // Set the prompt message text

    // Update the button texts to Yes and No
    this.buttons[0].textContent = 'Yes';
    this.buttons[1].textContent = 'No';
    this.buttons[2].style.display = 'none'; // Hide the third button

    overlay.style.display = 'flex'; // Show the overlay
  }

  // Function to show the Windows prompt with options
  showWindowsPrompt({ MESSAGE, OPTIONS }) {
    this.tempChoice = '';
    this.choiceSet = false; // Reset the flag before showing the prompt
    let result;

    switch (OPTIONS) {
      case 'Ok and Cancel':
        result = confirm(MESSAGE);
        this.tempChoice = result ? 'Ok' : 'Cancel';
        this.choiceSet = true; // Mark the choice as set
        break;
      case 'Ok':
        alert(MESSAGE);
        this.tempChoice = 'Ok';
        this.choiceSet = true; // Mark the choice as set
        break;
      case 'Text Field':
        result = prompt(MESSAGE);
        if (result !== null && result !== '') {
          this.tempChoice = result;
        } else {
          this.tempChoice = 'Cancel';
        }
        this.choiceSet = true; // Mark the choice as set
        break;
    }

        // Delay the reset to ensure the output can be captured
    setTimeout(() => {
      this.choiceSet = false; // Reset the flag after 5 seconds
      this.tempChoice = ''; // Clear the temporary choice after 5 seconds
    }, 30000); // 30-second delay before clear
  }

  // Reporter block to return the user's choice
  userChoice() {
    if (this.choiceSet) {
      this.choice = this.tempChoice; // Set the choice to the temporary choice
      return this.choice;
    } else {
      return ''; // Return an empty string to prevent flashing
    }
  }
}

// Register the extension with Scratch
Scratch.extensions.register(new WindowPrompts());
