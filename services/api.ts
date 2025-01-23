// // // services/api.ts
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://silver-space-succotash-4g7r45pq64rfjv7-8000.app.github.dev';

// // // Agent Interfaces
// // export interface Agent {
// //   id: string;
// //   name: string;
// //   description: string;
// // }

// // export interface AgentQuery {
// //   query: string;
// // }

// // // Tool Interfaces
// // export interface Tool {
// //   name: string;
// //   description: string;
// // }

// // export interface ToolCode {
// //   code: string;
// // }

// // class ApiService {
// //   // Agent Endpoints
// //   async listAgents(): Promise<Agent[]> {
// //     const response = await fetch(`${API_BASE_URL}/agents/`);
// //     if (!response.ok) throw new Error('Failed to list agents');
// //     return response.json();
// //   }

// //   async createAgent(agent: { name: string; description: string }): Promise<Agent> {
// //     const response = await fetch(`${API_BASE_URL}/agents/`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(agent)
// //     });
// //     if (!response.ok) throw new Error('Failed to create agent');
// //     return response.json();
// //   }

// //   async uploadDocument(agentId: string, file: File): Promise<void> {
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     const response = await fetch(`${API_BASE_URL}/agents/${agentId}/upload`, {
// //       method: 'POST',
// //       body: formData
// //     });
// //     if (!response.ok) throw new Error('Failed to upload document');
// //   }

// //   async queryAgent(agentId: string, query: string): Promise<any> {
// //     const response = await fetch(`${API_BASE_URL}/agents/${agentId}/query`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ query })
// //     });
// //     if (!response.ok) throw new Error('Failed to query agent');
// //     return response.json();
// //   }

// //   async deleteAgent(agentId: string): Promise<void> {
// //     const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
// //       method: 'DELETE'
// //     });
// //     if (!response.ok) throw new Error('Failed to delete agent');
// //   }

// //   // Tool Endpoints
// //   async listTools(): Promise<Tool[]> {
// //     const response = await fetch(`${API_BASE_URL}/tools/`);
// //     if (!response.ok) throw new Error('Failed to list tools');
// //     return response.json();
// //   }

// //   async createTool(tool: Tool): Promise<Tool> {
// //     const response = await fetch(`${API_BASE_URL}/tools/`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(tool)
// //     });
// //     if (!response.ok) throw new Error('Failed to create tool');
// //     return response.json();
// //   }

// //   async createToolFromCode(code: string): Promise<Tool> {
// //     const response = await fetch(`${API_BASE_URL}/tools/code`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ code })
// //     });
// //     if (!response.ok) throw new Error('Failed to create tool from code');
// //     return response.json();
// //   }

// //   async getTool(toolName: string): Promise<Tool> {
// //     const response = await fetch(`${API_BASE_URL}/tools/${toolName}`);
// //     if (!response.ok) throw new Error('Failed to get tool');
// //     return response.json();
// //   }

// //   async executeTool(toolName: string, params: any): Promise<any> {
// //     const response = await fetch(`${API_BASE_URL}/tools/${toolName}/execute`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(params)
// //     });
// //     if (!response.ok) throw new Error('Failed to execute tool');
// //     return response.json();
// //   }
// // }

// // export const apiService = new ApiService();
// -THE WORKING ONE
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://silver-space-succotash-4g7r45pq64rfjv7-8000.app.github.dev';

// // Agent Interfaces
// export interface Agent {
//   id: string;
//   name: string;
//   description: string;
// }

// export interface AgentQuery {
//   query: string;
// }

// // Tool Interfaces
// export interface Tool {
//   name: string;
//   description: string;
// }

// export interface ToolCode {
//   code: string;
// }

// class ApiService {
//   private async fetchWithConfig(url: string, config: RequestInit = {}): Promise<Response> {
//     console.log(`Making request to: ${url}`);
    
//     const defaultConfig: RequestInit = {
//       credentials: 'include',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       ...config,
//       // Merge headers properly while preserving content-type for FormData
//       headers: {
//         ...config.headers,
//         'Content-Type': config.headers?.['Content-Type'] || 'application/json',
//         'Accept': 'application/json',
//       },
//     };

//     console.log('Request config:', defaultConfig);

//     try {
//       const response = await fetch(url, defaultConfig);
//       console.log('Response status:', response.status);
//       console.log('Response headers:', Object.fromEntries(response.headers));

//       if (response.status === 302) {
//         const redirectUrl = response.headers.get('location');
//         console.log('Redirect detected to:', redirectUrl);
//         throw new Error(`Unexpected redirect to: ${redirectUrl}`);
//       }

//       return response;
//     } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//     }
//   }

//   async testConnection(): Promise<boolean> {
//     try {
//       const response = await this.fetchWithConfig(`${API_BASE_URL}/test`);
//       return response.ok;
//     } catch (error) {
//       console.error('Connection test failed:', error);
//       return false;
//     }
//   }

//   // Agent Endpoints
//   async listAgents(): Promise<Agent[]> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`);
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to list agents: ${error}`);
//     }
//     return response.json();
//   }

//   async createAgent(agent: { name: string; description: string }): Promise<Agent> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`, {
//       method: 'POST',
//       body: JSON.stringify(agent)
//     });
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to create agent: ${error}`);
//     }
//     return response.json();
//   }

//   async uploadDocument(agentId: string, file: File): Promise<void> {
//     const formData = new FormData();
//     formData.append('file', file);
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}/upload`, {
//       method: 'POST',
//       headers: {}, // Let browser set content-type for FormData
//       body: formData,
//       credentials: 'include'
//     });
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to upload document: ${error}`);
//     }
//   }

//   async queryAgent(agentId: string, query: string): Promise<any> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}/query`, {
//       method: 'POST',
//       body: JSON.stringify({ query })
//     });
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to query agent: ${error}`);
//     }
//     return response.json();
//   }

//   async deleteAgent(agentId: string): Promise<void> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}`, {
//       method: 'DELETE'
//     });
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to delete agent: ${error}`);
//     }
//   }

//   // Tool Endpoints
//   async listTools(): Promise<Tool[]> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`);
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to list tools: ${error}`);
//     }
//     return response.json();
//   }

//   async createTool(tool: Tool): Promise<Tool> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`, {
//       method: 'POST',
//       body: JSON.stringify(tool)
//     });
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to create tool: ${error}`);
//     }
//     return response.json();
//   }

//   async createToolFromCode(code: string): Promise<Tool> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/code`, {
//       method: 'POST',
//       body: JSON.stringify({ code })
//     });
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to create tool from code: ${error}`);
//     }
//     return response.json();
//   }

//   async getTool(toolName: string): Promise<Tool> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/${toolName}`);
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to get tool: ${error}`);
//     }
//     return response.json();
//   }

//   async executeTool(toolName: string, params: any): Promise<any> {
//     const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/${toolName}/execute`, {
//       method: 'POST',
//       body: JSON.stringify(params)
//     });
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Failed to execute tool: ${error}`);
//     }
//     return response.json();
//   }
// }

// export const apiService = new ApiService();
// services/api.ts

// 
// api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://silver-space-succotash-4g7r45pq64rfjv7-8000.app.github.dev';

// Interfaces
export interface Agent {
  id: number;
  name: string;
  type: string;
  status: string;
  configuration?: {
    description?: string;
    [key: string]: any;
  };
}

export interface Tool {
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  is_sample: boolean;
}

interface CreateAgentParams {
  name: string;
  type: string;
  configuration: {
    description?: string;
    instructions?: string;
    prompt_template?: string;
    tools?: string[];
    tools_config?: any;
    [key: string]: any;
  };
}
class ApiService {
  private async fetchWithConfig(url: string, config: RequestInit = {}): Promise<Response> {
    console.log(`Making request to: ${url}`);
    
    const defaultConfig: RequestInit = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': config.headers?.['Content-Type'] || 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = await fetch(url, defaultConfig);
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    return response;
  }

  // Agents Endpoints
  async listAgents(): Promise<Agent[]> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list agents: ${error}`);
    }
    return response.json();
  }

  // async createAgent(agent: { name: string; type: string; description?: string }): Promise<Agent> {
  //   const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: agent.name,
  //       type: agent.type,
  //       configuration: {
  //         description: agent.description
  //       }
  //     })
  //   });
  //   if (!response.ok) {
  //     const error = await response.text();
  //     throw new Error(`Failed to create agent: ${error}`);
  //   }
  //   return response.json();
  // }
  async createAgent(agent: CreateAgentParams): Promise<Agent> {
    console.log('Creating agent with config:', agent); // Debug log
    
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`, {
      method: 'POST',
      body: JSON.stringify({
        name: agent.name,
        type: agent.type,
        configuration: agent.configuration  // Pass the entire configuration object
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Agent creation failed:', error); // Debug log
      throw new Error(`Failed to create agent: ${error}`);
    }
    
    return response.json();
  }

  async uploadDocument(agentId: number | string, file: File): Promise<void> {
    console.log('Starting upload:', { agentId, fileName: file.name });

    const formData = new FormData();
    formData.append('file', file, file.name);  // Add filename explicitly

    // Log the actual FormData contents
    for (let [key, value] of formData.entries()) {
        console.log('FormData entry:', key, value instanceof File ? value.name : value);
    }

    try {
        const url = `${API_BASE_URL}/agents/${agentId}/upload`;
        console.log('Making request to:', url);

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
            // Let browser handle the Content-Type header
        }).catch(error => {
            console.error('Network error during fetch:', error);
            throw new Error(`Network error during upload: ${error.message}`);
        });

        if (!response.ok) {
            const text = await response.text().catch(() => 'No error text available');
            console.error('Upload failed:', {
                status: response.status,
                statusText: response.statusText,
                text
            });
            throw new Error(`Upload failed (${response.status}): ${text}`);
        }

        const result = await response.json().catch(() => ({ message: 'Upload completed but no JSON response' }));
        console.log('Upload successful:', result);
        return result;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

  async queryAgent(agentId: string | number, userText: string): Promise<any> {
    // Debug: Log what we're trying to send
    console.log('Attempting to send query:', { agentId, userText });

    // Create URLSearchParams instead of FormData
    const formData = new URLSearchParams();
    formData.append('query', userText);

    // Debug: Log what's being sent
    console.log('Form data being sent:', formData.toString());

    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        credentials: 'include'
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Query error details:', errorText);
        throw new Error(`Failed to query agent: ${errorText}`);
    }

    return response.json();
  }

  async deleteAgent(agentId: number | string): Promise<void> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete agent: ${error}`);
    }
  }

  // Tools Endpoints
  async listTools(): Promise<Tool[]> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list tools: ${error}`);
    }
    return response.json();
  }

  async createTool(description: string): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`, {
      method: 'POST',
      body: JSON.stringify({ description })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create tool: ${error}`);
    }
    return response.json();
  }

  async createToolFromCode(code: string): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/code`, {
      method: 'POST',
      body: JSON.stringify({ code })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create tool from code: ${error}`);
    }
    return response.json();
  }

  async getTool(toolName: string): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/${toolName}`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get tool: ${error}`);
    }
    return response.json();
  }

  async executeTool(toolName: string, params: any): Promise<any> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/${toolName}/execute`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to execute tool: ${error}`);
    }
    return response.json();
  }
}

export const apiService = new ApiService();