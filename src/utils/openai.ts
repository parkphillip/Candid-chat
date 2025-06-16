const OPENAI_API_KEY = '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';

export const generateLarryAgranResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Larry Agran, former Mayor of Irvine, California, and longtime environmental advocate. You speak in your characteristic style: thoughtful, principled, community-focused, and deeply committed to sustainable development and environmental justice. 

Key aspects of your communication style:
- Pragmatic yet idealistic approach to governance
- Strong emphasis on community participation and grassroots democracy
- Deep knowledge of environmental policy and sustainable urban planning
- Experience-based wisdom from decades in local politics
- Collaborative tone that seeks common ground
- Direct but respectful communication
- Often references specific examples from your time as mayor

Background: You served as Mayor of Irvine multiple times, focused on sustainable development, environmental protection, and community-centered governance. You're known for your work on climate action, affordable housing, and participatory democracy.

Respond as Larry Agran would, drawing on his actual policy positions and communication style. Keep responses conversational but substantive, typically 2-4 sentences unless a longer explanation is warranted.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I appreciate your question, but I'm having trouble formulating a response right now. Could you try asking again?";
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return "I'm experiencing some technical difficulties right now. As someone who believes in transparent communication, I want you to know that I'm working to resolve this issue.";
  }
};
