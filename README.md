# Goose Perplexity MCP Extension

A Model Context Protocol (MCP) extension that integrates Perplexity AI search capabilities with Goose AI assistant.

## Features

- 🔍 **Perplexity AI Integration**: Direct access to Perplexity's sonar model for web search and research
- 🛠️ **MCP Compliant**: Built using the official Model Context Protocol SDK
- ⚡ **Simple & Fast**: Minimal setup with robust error handling
- 🔐 **Secure**: API key management through environment variables

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Perplexity AI API key

### Setup

1. Clone this repository:
```bash
git clone https://github.com/PratzG/goose-perplexity-mcp.git
cd goose-perplexity-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Create a Perplexity API key to the environment:
```bash
echo "PPLX_API_KEY=your_api_key_here"
```

4. Build the extension:
```bash
npm run build
```

## Usage

### With Goose

Add this extension to your Goose configuration or run directly:

```bash
goose session --with-extension "node /path/to/goose-perplexity-mcp/dist/server.js"
```

### Available Tools

- **pplx_search**: Run a Perplexity search and return the answer text
  - Parameters: `query` (string) - Search question or prompt

### Example

```typescript
// The extension provides a pplx_search tool that you can use like:
await pplx_search({ query: "What are the latest developments in AI?" });
```

## Development

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled server
- `npm run dev` - Build and run in one command

### Project Structure

```
├── src/
│   └── server.ts          # Main MCP server implementation
├── dist/                  # Compiled JavaScript output
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## API Reference

The extension uses Perplexity AI's chat completions endpoint with the `sonar` model, configured for optimal search results with low temperature (0.2) for consistent responses.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Create an issue on GitHub for bugs or feature requests
- Check the [Goose documentation](https://block.github.io/goose/) for general usage
- Review [MCP documentation](https://modelcontextprotocol.io/) for protocol details

---

Built with ❤️ for the Goose AI ecosystem
