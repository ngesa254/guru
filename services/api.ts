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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://glowing-system-q5p5wxrjvr397v-8000.app.github.dev";


/**
 * Agent interface from your backend
 * (Ensure it matches what's returned by the API)
 */
export interface Agent {
  id: string;
  name: string;
  description: string;
}

/**
 * For queries, the server expects { query: string }
 */
export interface AgentQuery {
  query: string;
}

/**
 * Tool interfaces, etc. if needed
 */
export interface Tool {
  name: string;
  description: string;
}

export interface ToolCode {
  code: string;
}

class ApiService {
  /**
   * A helper to unify fetch calls with default headers etc.
   */
  private async fetchWithConfig(url: string, config: RequestInit = {}): Promise<Response> {
    console.log(`Making request to: ${url}`);

    // Merge your default config
    const defaultConfig: RequestInit = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": config.headers?.["Content-Type"] || "application/json",
        Accept: "application/json",
      },
    };

    console.log("Request config:", defaultConfig);

    try {
      const response = await fetch(url, defaultConfig);

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers));

      // Example handling if 302 is not expected
      if (response.status === 302) {
        const redirectUrl = response.headers.get("location");
        console.log("Redirect detected to:", redirectUrl);
        throw new Error(`Unexpected redirect to: ${redirectUrl}`);
      }

      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  /**
   * Optional test to see if server is reachable
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.fetchWithConfig(`${API_BASE_URL}/test`);
      return response.ok;
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //                            AGENTS
  // ─────────────────────────────────────────────────────────────────────────────

  async listAgents(): Promise<Agent[]> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list agents: ${error}`);
    }
    return response.json();
  }

  async createAgent(agent: { name: string; description: string }): Promise<Agent> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`, {
      method: "POST",
      body: JSON.stringify(agent),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create agent: ${error}`);
    }
    return response.json();
  }

  async uploadDocument(agentId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    // When sending FormData, do NOT set 'Content-Type'
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}/upload`, {
      method: "POST",
      headers: {}, // Let fetch set content-type for FormData
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to upload document: ${error}`);
    }
  }

  /**
   * The key method to send "query" to the server
   */
  async queryAgent(agentId: string | number, userText: string): Promise<any> {
    // Debug log to verify data being sent
    console.log('Sending query to agent:', { agentId, userText });

    // Create FormData and append the query
    const formData = new FormData();
    formData.append('query', userText);

    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}/query`, {
        method: 'POST',
        // Important: Don't set Content-Type when using FormData
        headers: {},
        body: formData
    });

    // Log response for debugging
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Query error details:', errorText);
        throw new Error(`Failed to query agent: ${errorText}`);
    }

    return response.json();
  }

  async deleteAgent(agentId: string): Promise<void> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete agent: ${error}`);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //                             TOOLS
  // ─────────────────────────────────────────────────────────────────────────────

  async listTools(): Promise<Tool[]> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list tools: ${error}`);
    }
    return response.json();
  }

  async createTool(tool: Tool): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`, {
      method: "POST",
      body: JSON.stringify(tool),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create tool: ${error}`);
    }
    return response.json();
  }

  async createToolFromCode(code: string): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/code`, {
      method: "POST",
      body: JSON.stringify({ code }),
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
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to execute tool: ${error}`);
    }
    return response.json();
  }
}

export const apiService = new ApiService();
