const extension = {
  getInfo: () => ({
    id: 'aiHelper',
    name: 'AI Helper',
    blocks: [
      {
        opcode: 'askAI',
        blockType: Scratch.BlockType.REPORTER,
        text: 'Ask AI [QUESTION]',
        arguments: {
          QUESTION: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: 'What is the capital of Nigeria?'
          }
        }
      }
    ]
  }),

  askAI: async (args) => {
    const apiKey = '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'; // Replace with your OpenAI API key
    const question = args.QUESTION;
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: question }],
          max_tokens: 100
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error querying OpenAI:', error);
      return 'Error: Unable to fetch response';
    }
  }
};

Scratch.extensions.register(extension);
